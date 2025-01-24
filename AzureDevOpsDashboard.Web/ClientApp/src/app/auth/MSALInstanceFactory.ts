import { BrowserCacheLocation, Configuration, IPublicClientApplication, LogLevel, PublicClientApplication } from "@azure/msal-browser";

export const MsalConfig: Configuration = {
    auth: {
        clientId: '', // Replace with your app's client ID
        authority: 'https://login.microsoftonline.com/common', // Replace with your tenant subdomain
        redirectUri: '/',
        postLogoutRedirectUri: '/',
    },
    cache: {
        cacheLocation: BrowserCacheLocation.SessionStorage,
        storeAuthStateInCookie: true,
        secureCookies: true,
        temporaryCacheLocation: BrowserCacheLocation.SessionStorage
        // Use sessionStorage for more security
    },
    system: {
        loggerOptions: {
            loggerCallback(logLevel: LogLevel, message: string) {
                console.log('loggerCallback', message);
            },
            logLevel: LogLevel.Verbose,
            piiLoggingEnabled: false,
        },
    },
};

export function MsalInstanceFactory(): IPublicClientApplication {
    return new PublicClientApplication(MsalConfig);
}
