import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BaseService } from './service';

const URL = '/social/admin/userLevel/';

@Injectable({
    providedIn: 'root',
  })
export class InterestedUserService extends BaseService {
    public url: string = URL;
    constructor(
        protected http: HttpClient
    ) {
        super();
    }

    
}