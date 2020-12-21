import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
	selector: 'apps-event-dialog-component',
	templateUrl: './event-dialog.component.html',
	styleUrls: ['./event-dialog.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsEventDialogComponent {
    form: FormGroup;
    constructor(
        public dialogRef: MatDialogRef<AppsEventDialogComponent>,
		private formBuilder: FormBuilder,
    ) {}

    onClose(): void {
		this.dialogRef.close();
	}
}