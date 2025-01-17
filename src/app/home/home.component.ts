import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { init, waitForInit } from '../async-init';
import { UserService } from '../user-service';
import { DomSanitizer } from '@angular/platform-browser';
import { AccountInfo } from '@azure/msal-browser';
import { PatComponent } from '../pat/pat.component';
import { AzureService } from '../azure/azure.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [PatComponent],
  imports: [PatComponent]
})
export class HomeComponent implements OnInit {
  authService: AuthService = inject(AuthService);
  userService: UserService = inject(UserService);
  azureService : AzureService = inject(AzureService);
  sanitizer: DomSanitizer = inject(DomSanitizer);

  token: string | null | undefined = ''; 
  photo: any | null = null;
  account: AccountInfo | undefined | null;

  @waitForInit
  ngOnInit() {
    this.account = this.authService.getAccount();
    console.log(this.account);
  }

  _arrayBufferToBase64(buffer: ArrayBuffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  @init
  private async asyncInit() {
    this.token = await this.authService.getToken();
    this.photo = await this.userService.getUserPhoto(this.token);
    
  }

  logout() {
    this.authService.logout();
  }

  async onIterationClick() {
    await this.azureService.getInterationInfo(this.account?.username || '', sessionStorage.getItem('pat') || '');
  }
}
