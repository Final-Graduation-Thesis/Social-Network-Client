import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AppsAdminModalComponent } from 'src/app/component/admin/modal/modal.component';

@Component({
    selector: "apps-admin-recommend-view",
    templateUrl: './recommend.view.html',
	styleUrls: ['./recommend.view.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsAdminRecommendView {

    constructor(
    ) {
    }

}