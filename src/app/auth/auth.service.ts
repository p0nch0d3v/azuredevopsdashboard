import { Injectable } from '@angular/core';
import { AccountInfo, AuthenticationResult } from '@azure/msal-browser';
import { MsalInstanceFactory } from './MSALInstanceFactory';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private msalInstance = MsalInstanceFactory();

  constructor() {
    this.msalInstance.initialize();
  }

  async login() {
    await this.msalInstance.loginRedirect();
  }

  async logout() {
    await this.msalInstance.logoutRedirect();
  }

  async getToken(): Promise<string | null> {
    const userAccount = this.getAccount();
    const response: AuthenticationResult = await this.msalInstance.acquireTokenSilent({
      account: userAccount,
      scopes: ['user.read', 'profile']
    });
    return response.accessToken;
  }

  handleRedirectObservable(): Promise<AuthenticationResult | null> {
    return this.msalInstance.handleRedirectPromise()
  }

  getAccount(): AccountInfo | undefined{
    const accounts = this.msalInstance.getAllAccounts();
    if (accounts === undefined || accounts === null || accounts.length === 0) {
      return undefined;
    }
    return accounts[0];
  }
}
