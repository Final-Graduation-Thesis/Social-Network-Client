import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BaseService } from './service';
import { Observable, Subject } from 'rxjs';

const URL = '/social/admin/level/';

@Injectable({
    providedIn: 'root',
  })
export class RecommendService extends BaseService {
    protected url: string = URL;
    constructor(
        protected http: HttpClient
    ) {
        super();
    }

    private rl : Subject<any> = new Subject<any>();

    reload(item: any): void {
        this.rl.next(item);
    }

    onReload(): Observable<any> {
        return this.rl;
    }
}