import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BaseService, Options, Params } from './service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const URL = '/auth/user/';

@Injectable({
    providedIn: 'root',
  })
export class UserService extends BaseService {
    protected url: string = URL;
    constructor(
        protected http: HttpClient
    ) {
        super();
    }

    get(id: number, params: Params = {}): Observable<any> {
        return this.http.get(this.url + id, {params: params});
    }

    setSession(user: any) {
        localStorage.setItem('username', user.username);
        localStorage.setItem("birthday", user.birthday);
        localStorage.setItem("gender", user.gender);
        localStorage.setItem("email", user.email);
        localStorage.setItem("avatar", user.avatar);
    }

    getInfo(): any {
        return {
            username: localStorage.getItem("username"),
            email: localStorage.getItem("email"),
            birthday: localStorage.getItem("birthday"),
			gender: localStorage.getItem("gender"),
			avatar: localStorage.getItem("avatar")
		}
    }
}