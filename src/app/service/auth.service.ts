import { Injectable } from '@angular/core';
import { shareReplay, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './service';
import * as moment from "moment";
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { Router } from '@angular/router';

const URL = '/auth/oauth/token';

@Injectable({
    providedIn: 'root',
  })
export class AuthService extends BaseService {
    protected url: string = URL;
    constructor(
        protected http: HttpClient,
        private userService: UserService,
        private router: Router,
    ) {
        super();
    }

    ngOnInit(): void {
    }

    login(email:string, password:string) {
        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set("Authorization", "Basic " + btoa("browser:"))
        };
        let form = new FormData();
        form.append('grant_type', 'password');
        form.append('username', email);
        form.append('password', password);
        form.append('scope', 'ui');
        return this.http.post<any>(this.url, form, { withCredentials: true }).pipe(map(res => this.setSession(res)));
    }

    private setSession(authResult) {

        const expires_in = moment().add(authResult.expires_in,"second");
        localStorage.setItem("access_token", authResult.access_token);
        localStorage.setItem("expires_in", JSON.stringify(expires_in.valueOf()) );
        localStorage.setItem("user_id", authResult.user_id);
        this.userService.get(parseInt(localStorage.getItem('user_id'))).subscribe(res => {
            this.userService.setSession(res);
		});
    }          

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_in');
        localStorage.removeItem('user_id');
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    public getToken() {
        return localStorage.getItem('access_token');
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem('expires_in');
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }   

    register(body: any): Observable<any> {
		return this.http.post('/auth/user/register', body);
	}
}