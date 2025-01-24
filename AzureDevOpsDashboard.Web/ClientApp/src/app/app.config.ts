import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, } from '@angular/common/http';
import { MsalGuard, MsalInterceptor, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalInterceptorConfiguration, MsalBroadcastService, MsalService } from '@azure/msal-angular';

import { routes } from './app.routes';
import { AuthService } from './auth/auth.service';
import { MsalInstanceFactory } from './auth/MSALInstanceFactory';
import { MSALGuardConfigFactory } from './auth/MSALGuardConfigFactory';
import { MSALInterceptorConfigFactory } from './auth/MSALInterceptorConfigFactory';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MsalInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    MsalService,
    AuthService,
    MsalGuard,
    MsalBroadcastService,
    provideHttpClient()
  ]
};
