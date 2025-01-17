import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient) { }

    async getUserPhoto(token: string | null) {
        let headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token,
            'Response-Type': 'image/png',
            'Content-Type': 'image/png'
        });

        await firstValueFrom(this.http.get(
            'https://graph.microsoft.com/beta/me/photo/$value',
            { headers, responseType: "arraybuffer" }
        ));
    }
}