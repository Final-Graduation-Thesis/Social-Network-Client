import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BaseService } from './service';

const URL = '/social/post/search/';

@Injectable({
    providedIn: 'root',
  })
export class SearchService extends BaseService {
    public url: string = URL;
    constructor(
        protected http: HttpClient
    ) {
        super();
    }

    
}