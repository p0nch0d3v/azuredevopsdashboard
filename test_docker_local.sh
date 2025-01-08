#!/bin/bash

env_file='.env.docker'
image_name='azure-devops-dashboard:dev'
container_name='azure-devops-dashboard-dev'

docker container stop $container_name
docker container rm $container_name
docker image rm $image_name

docker build \
    --progress plain \
    --no-cache \
    --tag $image_name \
    --debug \
    .

if [[ -e $env_file ]] then
    export $(cat $env_file | xargs)
    cat $env_file
fi

docker run \
    --rm \
    --publish 4200:80 \
    --env MODE=$MODE \
    --env NODE_ENV=$NODE_ENV \
    --name $container_name \
    $image_name
