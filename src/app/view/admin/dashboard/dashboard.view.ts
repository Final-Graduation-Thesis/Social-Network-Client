import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AppsAdminModalComponent } from 'src/app/component/admin/modal/modal.component';

@Component({
    selector: "apps-admin-dashboard-view",
    templateUrl: './dashboard.view.html',
	styleUrls: ['./dashboard.view.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsAdminDashboardView {

    constructor(
    ) {
    }

}