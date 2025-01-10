import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { init, waitForInit } from '../async-init';
import { UserService } from '../user-service';
import { HttpClient } from '@angular/common/http';
import { concatAll } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { AccountInfo } from '@azure/msal-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: []
})
export class HomeComponent implements OnInit {
  token: string | null;
  photo: any | null;
  account: AccountInfo | undefined | null;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private sanitizer: DomSanitizer) {
    this.token = null;
    this.photo = null;
    this.account = null;
  }

  @waitForInit
  ngOnInit() {
    this.userService.getUserPhoto(this.token).subscribe(result => {
      this.photo = this.sanitize('data:image/jpg;base64, ' + this._arrayBufferToBase64(result));
    });
    this.account = this.authService.getAccount();
    console.log(this.account);
  }

  _arrayBufferToBase64(buffer: ArrayBuffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  @init
  private async loadMovies() {
    console.log('getToken')
    this.token = await this.authService.getToken();
  }

  // login() {
  //   this.authService.login().then(l => { debugger; }).catch(e => { console.error(e) });
  // }

  logout() {
    this.authService.logout();
  }
}
