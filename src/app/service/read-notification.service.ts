import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BaseService } from './service';
import { Observable } from 'rxjs/internal/Observable';

const URL = '/social/notification/markAsRead/';

@Injectable({
    providedIn: 'root',
  })
export class ReadNotificationService extends BaseService {
    public url: string = URL;
    constructor(
        protected http: HttpClient
    ) {
        super();
    }

    markAsRead(url? : string, id?: number): Observable<any> {
        if (url) {
            return this.http.post(url, '');
        }
        return this.http.post(this.url + id, '');
    }

    readDetail(url?: string, id?: number): Observable<any> {
        return this.http.post(url + id, '');

    }
}