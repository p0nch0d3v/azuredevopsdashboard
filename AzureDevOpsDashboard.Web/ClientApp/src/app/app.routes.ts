import { Route, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MsalGuard, MsalInterceptor } from '@azure/msal-angular';

export const routes: Route[] = [
    { path: '', component: HomeComponent, canActivate: [MsalGuard] },
    { path: 'login', component: LoginComponent },
];
