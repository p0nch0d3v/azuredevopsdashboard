import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private httpClient: HttpClient = inject(HttpClient);
    sanitizer: DomSanitizer = inject(DomSanitizer);

    async getUserPhoto(token: string | null):Promise<SafeUrl> {
        let headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token,
            'Response-Type': 'image/png',
            'Content-Type': 'image/png'
        });

        const rawPhoto =  await firstValueFrom(this.httpClient.get(
            'https://graph.microsoft.com/beta/me/photo/$value',
            { headers, responseType: "arraybuffer" }
        ));

        const photo = this.sanitize('data:image/jpg;base64, ' + this._arrayBufferToBase64(rawPhoto));
        return photo;
    }

    private sanitize(url: string) {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }

    private _arrayBufferToBase64(buffer: ArrayBuffer) {
        let binary = '';
        let bytes = new Uint8Array(buffer);
        let len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }
}