import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient) { }

    getUserPhoto(token: string | null) {
        let headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token,
            'Response-Type': 'image/png',
            'Content-Type': 'image/png'
        });
        return this.http.get(
            'https://graph.microsoft.com/beta/me/photo/$value',
            { headers, responseType: "arraybuffer" }
        );
    }
}