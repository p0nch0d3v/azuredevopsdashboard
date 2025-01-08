# build
FROM node:20 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
COPY . ./
RUN npm run build
# RUN ls -la /app/dist/azure-dashboard

#nginx
FROM nginx:alpine
COPY --from=build /app/dist/azure-dashboard/browser /usr/share/nginx/html
# RUN ls -la /usr/share/nginx/html/browser
# RUN cat /usr/share/nginx/html/index.html

# FROM node:20-slim
# WORKDIR /app
# COPY --from=build /app/dist /app/dist
#CMD ["ls", "/app/dist/azure-dashboard"]
#CMD ["node", "/app/dist/azure-devops-dashboard/server/server.mjs"]
