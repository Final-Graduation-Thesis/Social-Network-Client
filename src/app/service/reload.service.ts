import { Injectable } from "@angular/core"

import { Observable, Subject } from "rxjs";

@Injectable()
export class ReloadService {

    private reload : Subject<boolean> = new Subject<boolean>();

    reloadPost(isReload: boolean): void {
        this.reload.next(isReload);
    }

    onReloadPost(): Observable<boolean> {
        return this.reload;
    }

}