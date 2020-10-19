import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseService, Options } from './service';

const URL = 'social/comment/';

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

    get(postId: number): Observable<any> {
        return this.http.get(this.url + postId);
    }
}