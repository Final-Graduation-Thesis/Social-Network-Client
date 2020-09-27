import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseService, Options } from './service';

const URL = '/api/comments/';

@Injectable({
    providedIn: 'root',
  })
export class CommentService extends BaseService {
    protected url: string = URL;
    constructor(
        protected http: HttpClient
    ) {
        super();
    }
}