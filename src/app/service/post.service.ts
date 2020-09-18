import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BaseService } from './service';

const URL = '/api/teams';

@Injectable({
    providedIn: 'root',
  })
export class PostService extends BaseService {
    protected url: string = URL;
    constructor(
        protected http: HttpClient
    ) {
        super();
    }

    
}