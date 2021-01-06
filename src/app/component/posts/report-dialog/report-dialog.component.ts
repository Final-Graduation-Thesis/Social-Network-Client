import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { ReportService } from 'src/app/service/report.service';
import { TypeReportService } from 'src/app/service/type-report.service';

@Component({
	selector: 'apps-report-dialog-component',
	templateUrl: './report-dialog.component.html',
	styleUrls: ['./report-dialog.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsReportDialogComponent implements OnInit {
	form: FormGroup;
	typeReports: any[] = [];
	id: number;
    constructor(
		public dialogRef: MatDialogRef<AppsReportDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private formBuilder: FormBuilder,
		private snackBar: MatSnackBar,
		private reportService: ReportService,
		private typeReportService: TypeReportService
    ) {}

	ngOnInit(): void {
		this.form = this.formBuilder.group({
			postId: this.data.postId,
			description: [""],
			typeReportId: ["", Validators.required],
		});
		this.typeReportService.list().subscribe(res => {
			this.typeReports = res;
			console.log(this.typeReports);
		});
		
	}
    onClose(): void {
		this.dialogRef.close();
	}

	submit(): void {
		let body: any = {
			postId: this.data.postId,
			description: this.form.value.description || "",
			reportType: {
				id: this.form.value.typeReportId
			}
		};
		if (this.form.invalid) {
			return;
		}
		this.reportService.post('/social/report', body).subscribe({
			next: (res) => {
			this.onClose();
			this.snackBar.open("Báo cáo thành công", null, {
				duration: 2000,
				panelClass: 'success'
			});
		},
		error: (err) => {
			this.onClose();
			this.snackBar.open("Lỗi xảy ra, vui lòng thử lại", null, {
				duration: 2000,
				panelClass: 'error'
			});
		},
		complete: () => {
			this.snackBar.open("Báo cáo thành công", null, {
				duration: 2000,
				panelClass: 'success'
			});
		}

	})
	}
	// onChangeType(): void {
	// 	this.id = this.form.value.typeReportId;
	// 	console.log(this.id);
	// }
}