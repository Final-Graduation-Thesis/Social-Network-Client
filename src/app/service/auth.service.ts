import { Injectable } from '@angular/core';
import { shareReplay, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './service';
import * as moment from "moment";

const URL = '/auth/oauth/token';

@Injectable({
    providedIn: 'root',
  })
export class AuthService extends BaseService {
    protected url: string = URL;
    constructor(
        protected http: HttpClient
    ) {
        super();
    }

    login(email:string, password:string) {
        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };
        let form = new FormData();
        form.append('grant_type', 'password');
        form.append('username', email);
        form.append('password', password);
        form.append('scope', 'ui');
        return this.http.post<any>(this.url, form).pipe(map(res => this.setSession(res)));
    }

    private setSession(authResult) {
        const expires_in = moment().add(authResult.expires_in,'second');

        localStorage.setItem('access_token', authResult.access_token);
        localStorage.setItem("expires_in", JSON.stringify(expires_in.valueOf()) );
        console.log(localStorage);
    }          

    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    public getToken() {
        return localStorage.getItem('id_token');
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }   
    
}