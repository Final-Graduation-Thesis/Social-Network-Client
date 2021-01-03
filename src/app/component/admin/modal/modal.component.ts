import { Component, EventEmitter, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { PostService } from 'src/app/service/post.service';
import { TypeReportService } from 'src/app/service/type-report.service';

@Component({
	selector: 'apps-admin-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsAdminModalComponent implements OnInit {

	constructor(
		public dialogRef: MatDialogRef<AppsAdminModalComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public snackBar: MatSnackBar,
		private postService: PostService,
		private typeReportService: TypeReportService

	) {}

	ngOnInit(): void {
	}
	
	onDelete(): void {
		if (this.data.type == "delete-post") {
			this._deletePost();
		} else if (this.data.type == "delete-type-report") {
			this._deleteTypeReport();
		}
	}

	_deletePost(): void {
		this.postService.delete(this.data.postId).subscribe({
			next: (res) => {},
			error: (err) => {
				this.snackBar.open("Đã có lỗi xảy ra, vui lòng thử lại", null, {
					duration: 2000,
					panelClass: 'error'
				});
				this.dialogRef.close();

			},
			complete: () => {
				this.snackBar.open("Xóa thành công", null, {
					duration: 2000,
					panelClass: 'success'
				});
				this.dialogRef.close();

			}
		});
	}

	_deleteTypeReport(): void {
		this.typeReportService.delete(this.data.id).subscribe({
			next: (res) => {},
			error: (err) => {
				this.snackBar.open("Xóa thành công", null, {
					duration: 2000,
					panelClass: 'success'
				});
				this.dialogRef.close();
				this.typeReportService.reload({isReload: true});
			},
			complete: () => {
				this.snackBar.open("Xóa thành công", null, {
					duration: 2000,
					panelClass: 'success'
				});
				this.dialogRef.close();
				this.typeReportService.reload({isReload: true});
			}
		});

	}

	onCancel(): void {
		this.dialogRef.close();
	}

}