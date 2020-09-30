import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AppsPostDialogComponent } from '../../component/posts/CreatePostDialog/post-dialog.component';
import { PostService } from '../../service/post.service';

@Component({
	selector: 'apps-home-view-component',
	templateUrl: './apps-home-view-component.view.html',
	styleUrls: ['./apps-home-view-component.view.scss']
})
export class AppsHomeViewComponent implements OnInit {

	postData: any;
	constructor(
		private postService: PostService,
		public dialog: MatDialog
	) {}

	ngOnInit() {
		this.postService.list().subscribe((res: any) => {
			this.postData = res
		});

	}

	onUpdatePostData() {
		this.postService.list().subscribe((res: any) => {
			this.postData = res
		});
	}
}
