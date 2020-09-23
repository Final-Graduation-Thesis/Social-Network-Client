import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'apps-post-dialog-component',
	templateUrl: './post-dialog.component.html',
	styleUrls: ['./post-dialog.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsPostDialogComponent implements OnInit {

	constructor(
		public dialogRef: MatDialogRef<AppsPostDialogComponent>,
		// @Inject(MAT_DIALOG_DATA) public data: any
		) {}

	ngOnInit(): void {

	}
	onNoClick(): void {
		this.dialogRef.close();
	}
}