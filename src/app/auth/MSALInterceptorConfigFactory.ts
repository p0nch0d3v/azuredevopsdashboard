import { MsalInterceptorConfiguration } from "@azure/msal-angular";
import { InteractionType } from "@azure/msal-browser";

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(
    'https://graph.microsoft.com/v1.0/me',
    ['user.read', 'profile']
  );

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}
