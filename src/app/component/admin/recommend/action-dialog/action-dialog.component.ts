import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActionService } from 'src/app/service/action.service';

@Component({
	selector: 'apps-admin-recommend-action-dialog-component',
	templateUrl: './action-dialog.component.html',
	styleUrls: ['./action-dialog.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsAdminRecommendActionDialogComponent implements OnInit {

	form: FormGroup;

	loading: boolean;
	isPrice: boolean = true;
	selectedImage: string[]  =  [];
	constructor(
		public dialogRef: MatDialogRef<AppsAdminRecommendActionDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private formBuilder: FormBuilder,
		private snackBar: MatSnackBar,
		private actionService: ActionService
	) { }

	ngOnInit(): void {

		this.form = this.formBuilder.group({
			actionName: [""],
			point: ["", Validators.required],
		})
	}
	onClose(): void {
		this.dialogRef.close();
	}

	submit(form: any): void {
		this.loading = true;
		let body: any = {
            "actionName": form.value.actionName,
			"point": form.value.point
		}

		if (!this.data.isEdited) {
			this.actionService.post(body).subscribe({
					next: (res) => {
					this.loading = false;
					this.onClose();
					this.snackBar.open("Tạo mới thành công", null, {
						duration: 2000,
						panelClass: 'success'
					});
                    this.actionService.reload({isReload: true, actionName: form.value.actionName,
                         point: form.value.point, id: res.id});
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
			this.actionService.put(this.data.id, body).subscribe({
				next: (res) => {
				this.loading = false;
				this.onClose();
				this.snackBar.open("Sửa thành công", null, {
					duration: 2000,
					panelClass: 'success'
				});
                this.actionService.reload({isReload: true, actionName: form.value.actionName,
                     point: form.value.point, id: res.id, isEdited: true});
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