import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BaseService } from './service';

const URL = '/social/admin/reports/';

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
}