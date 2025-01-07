import { MsalGuardConfiguration } from "@azure/msal-angular";
import { InteractionType } from "@azure/msal-browser";

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
    return {
      interactionType: InteractionType.Redirect,
      authRequest: {
        scopes: ['user.read', 'profile'],
      },
      loginFailedRoute: '/login',
    };
  }