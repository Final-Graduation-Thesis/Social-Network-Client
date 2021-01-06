import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BaseService } from './service';
import { Observable } from 'rxjs';

const URL = '/social/admin/report/';

@Injectable({
    providedIn: 'root',
  })
export class ReportService extends BaseService {
    protected url: string = URL;
    constructor(
        protected http: HttpClient
    ) {
        super();
    }

	post(url, body?: any): Observable<any> {
		return this.http.post(url, body);
	}

}