import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BaseService } from './service';

const URL = '/social/post/save/';

@Injectable({
    providedIn: 'root',
  })
export class SavedService extends BaseService {
    public url: string = URL;
    constructor(
        protected http: HttpClient
    ) {
        super();
    }

    
}