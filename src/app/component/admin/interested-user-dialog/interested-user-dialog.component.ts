import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InterestedUserService } from 'src/app/service/interested-user.service';


@Component({
	selector: 'apps-admin-interested-user-dialog',
	templateUrl: './interested-user-dialog.component.html',
	styleUrls: ['./interested-user-dialog.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsAdminInterestedUserDialogComponent implements OnInit {

	userList: any[] = [];
	hasNext: any;
	nextLink: any;
	nextPageNumber: any;
	previousPageNumber: any;

	constructor(
		public dialogRef: MatDialogRef<AppsAdminInterestedUserDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private interestedUserService: InterestedUserService

	) {}

	ngOnInit(): void {
		this.load();
	}

	load(pageNumber: number = 0): void {
        this.interestedUserService.get(this.data.id, {limit: 10, page: pageNumber}).subscribe(res => {
            this.userList = res.items;
            this.hasNext = res.hasNext;
            this.nextLink = res.nextLink;
            this.nextPageNumber = parseInt(res.nextLink[res.nextLink.length - 1]);
            let previousPageNumber: number = parseInt(res.nextLink[res.nextLink.length - 1]) - 2;
            this.previousPageNumber = previousPageNumber >= 0 ? previousPageNumber : 0;
        })
	}

	nextPage(nextPageNumber: number): void {
		this.load(nextPageNumber);
  	}

	onClose(): void {
		this.dialogRef.close();
	}

}