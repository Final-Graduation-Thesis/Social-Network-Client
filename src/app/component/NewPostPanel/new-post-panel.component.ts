import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AppsPostDialogComponent } from '../../component/posts/CreatePostDialog/post-dialog.component';

@Component({
	selector: 'apps-new-post-panel-component',
	templateUrl: './new-post-panel.component.html',
	styleUrls: ['./new-post-panel.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsNewPostPanelComponent implements OnInit {

	avatar: string;
	constructor(
		private dialog: MatDialog
    ) {}

	ngOnInit() {
		this.avatar = localStorage.getItem('avatar');
	}

    openDialog(): void {
        const dialogRef = this.dialog.open(AppsPostDialogComponent, {
			width: '450px',
			data: {
			}
		  });
    }
}
