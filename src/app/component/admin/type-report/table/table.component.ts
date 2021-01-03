import {
	Component, OnInit, ViewEncapsulation
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ReportService } from 'src/app/service/report.service';
import { TypeReportService } from 'src/app/service/type-report.service';
import { AppsAdminModalComponent } from '../../modal/modal.component';
import { AppsAdminTypeReportDialogComponent } from '../dialog/dialog.component';

@Component({
	selector: 'apps-admin-type-report-table',
    templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppsAdminTypeReportTableComponent implements OnInit {

	typeReports: any[] = [];
	id: number;
	constructor(
		private router: Router,
		private typeReportService: TypeReportService,
		private dialog: MatDialog,
	) {
		
	}
	
	ngOnInit(): void{
		this.typeReportService.onReload().subscribe(res => {
			console.log(res);
			if (res.isReload && !res.isEdited) {
				this.typeReports = this.typeReports.filter(res => res.id != this.id);
				if (res.name) {
					this.typeReports.push({name: res.name, id: res.id});
				}
			}
			if (res.isEdited) {
				this.typeReports.some(item => {
					if (item.id == res.id ) {
						item.name = res.name;
						return true;
					}
				})
			}
		})
	}
	ngAfterViewInit(): void {
		this.load();
	}

	load(pageNumber: number = 0): void {
			this.typeReportService.list('', { limit: 10, page: pageNumber}).subscribe({
				next: (res) => {
				this.typeReports = res;
			},
			error: (err)=> {},
			complete: () => {}
		});
	}

	onDelete(id: number): void {
		this.id = id;
		const dialogRef = this.dialog.open(AppsAdminModalComponent, {
			width: '350px',
			data: {
				id: id,
				type: 'delete-type-report'
			}
		  });
		
	}

	newType(): void {
		const dialogRef = this.dialog.open(AppsAdminTypeReportDialogComponent, {
			width: '450px',
			data: {
			}
		  });
	}

	onEdit(item: any) {
		const dialogRef = this.dialog.open(AppsAdminTypeReportDialogComponent, {
			width: '450px',
			data: {
				isEdited: true,
				name: item.name,
				id: item.id
			}
		  });
	}
}
