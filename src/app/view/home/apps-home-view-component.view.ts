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
			console.log(res);
			this.postData = res
		});
		console.log(this.postData);

	}

	onUpdatePostData() {
		console.log('delete');
		this.postService.list().subscribe((res: any) => {
			console.log(res);
			this.postData = res
		});
	}

	createPost(): void {
		const dialogRef = this.dialog.open(AppsPostDialogComponent, {
			width: '250px'
			
		  });
	}
}
