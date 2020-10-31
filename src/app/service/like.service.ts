import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './service';
import { Observable } from 'rxjs';

const URL = '/social/like/';

@Injectable({
    providedIn: 'root',
  })
export class LikeService extends BaseService {
    protected url: string = URL;
    constructor(
        protected http: HttpClient
    ) {
        super();
    }

    unlike(body: any): Observable<any> {
        const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
            body: body,
          };
		return this.http.delete(this.url, options);
	}
}