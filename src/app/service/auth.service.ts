import { Injectable } from '@angular/core';
import { shareReplay, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './service';
import * as moment from "moment";
import { Observable, Subject } from 'rxjs';
import { UserService } from './user.service';
import { Router } from '@angular/router';

const URL = '/auth/oauth/token';

@Injectable({
    providedIn: 'root',
  })
export class AuthService extends BaseService {
    protected url: string = URL;
    private rl : Subject<any> = new Subject<any>();

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
            .set("Authorization", "Basic YnJvd3Nlcjo=")
        };
        let form = `grant_type=password&username=${email}&password=${password}&scope=ui`;
        return this.http.post<any>(this.url, form, options).pipe(map(res => this.setSession(res)));
    }

    private setSession(authResult) {

        const expires_in = moment().add(authResult.expires_in, "second");
        localStorage.setItem("access_token", authResult.access_token);
        localStorage.setItem("expires_in", JSON.stringify(expires_in.valueOf()) );
        localStorage.setItem("user_id", authResult.user_id);
        this.userService.get(parseInt(localStorage.getItem('user_id'))).subscribe(res => {
            console.log(res);
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

    reloadHeader(item: any): void {
        this.rl.next(item);
    }

    onReloadHeader(): Observable<any> {
        return this.rl;
    }
}