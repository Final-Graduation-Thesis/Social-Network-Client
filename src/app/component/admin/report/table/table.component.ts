import {
	AfterViewInit,
	Component, OnInit, ViewEncapsulation
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ReportService } from 'src/app/service/report.service';
import { AppsAdminModalComponent } from '../../modal/modal.component';

@Component({
	selector: 'apps-admin-report-table',
    templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppsAdminReportTableComponent implements AfterViewInit {

	reports: any[] = [];
	hasNext: boolean;
	hasNext1: boolean;

	nextPageNumber: number = 0;
	previousPageNumber: number = 0;
	pageNumber: number = 0;

	constructor(
		private router: Router,
		private reportService: ReportService,
		private dialog: MatDialog,
	) {
		
	}
	
	ngAfterViewInit(): void {
		this.load();
	}

	nextPage(nextPageNumber: number): void {
		this.load(nextPageNumber);
	}

	load(pageNumber: number = 0): void {
			this.reportService.list('', { limit: 10, page: pageNumber}).subscribe({
				next: (res) => {
				this.hasNext = res.hasNext;
				this.reports = res.items;
				this.nextPageNumber = parseInt(res.nextLink[res.nextLink.length - 1]);
				let previousPageNumber: number = parseInt(res.nextLink[res.nextLink.length - 1]) - 2;
				this.previousPageNumber = previousPageNumber >= 0 ? previousPageNumber : 0;
			},
			error: (err)=> {},
			complete: () => {}
		});
	}

	navigatePost(id: number): void {
		this.router.navigateByUrl(`post/${id}`);
	}

	onDeletePost(postId: number, id: number): void {
		const dialogRef = this.dialog.open(AppsAdminModalComponent, {
			width: '350px',
			data: {
				postId: postId,
				type: "delete-post"
			}
		  });
		this.reportService.delete(id).subscribe();
	}

}
