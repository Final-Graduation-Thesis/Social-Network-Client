import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router'
import { TypeReportService } from 'src/app/service/type-report.service';
import { RecommendService } from 'src/app/service/recommend.service';

@Component({
	selector: 'apps-admin-recommend-dialog-component',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsAdminRecommendDialogComponent implements OnInit {

	form: FormGroup;

	loading: boolean;
	isPrice: boolean = true;
	selectedImage: string[]  =  [];
	constructor(
		public dialogRef: MatDialogRef<AppsAdminRecommendDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private formBuilder: FormBuilder,
		private snackBar: MatSnackBar,
		private recommendService: RecommendService
	) { }

	ngOnInit(): void {

		this.form = this.formBuilder.group({
			name: [""],
			activePoint: ["", Validators.required],
		})
	}
	onClose(): void {
		this.dialogRef.close();
	}

	submit(form: any): void {
		this.loading = true;
		let body: any = {
            "name": form.value.name,
			"activePoint": form.value.activePoint
		}

		if (!this.data.isEdited) {
			this.recommendService.post(body).subscribe({
					next: (res) => {
					this.loading = false;
					this.onClose();
					this.snackBar.open("Tạo mới thành công", null, {
						duration: 2000,
						panelClass: 'success'
					});
                    this.recommendService.reload({isReload: true, name: form.value.name,
                         activePoint: form.value.activePoint, id: res.id});
				},
				
				error: (err) => {
					this.loading = false;
					this.onClose();
					this.snackBar.open("Đã xảy ra lỗi, vui lòng thử lại", null, {
						duration: 2000,
						panelClass: 'error'
					});
				},

			});
		} else {
			this.recommendService.put(this.data.id, body).subscribe({
				next: (res) => {
				this.loading = false;
				this.onClose();
				this.snackBar.open("Sửa thành công", null, {
					duration: 2000,
					panelClass: 'success'
				});
                this.recommendService.reload({isReload: true, name: form.value.name,
                     activePoint: form.value.activePoint, id: res.id, isEdited: true});
			},
			
			error: (err) => {
				this.loading = false;
				this.onClose();
				this.snackBar.open("Sửa thành công", null, {
					duration: 2000,
					panelClass: 'success'
				});
			},

		});
		}
	}
}