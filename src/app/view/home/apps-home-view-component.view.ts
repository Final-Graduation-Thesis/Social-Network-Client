import { Component, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppsPostDialogComponent } from '../../component/posts/CreatePostDialog/post-dialog.component';
import { PostService } from '../../service/post.service';
import { Observable} from 'rxjs'
@Component({
	selector: 'apps-home-view-component',
	templateUrl: './apps-home-view-component.view.html',
	styleUrls: ['./apps-home-view-component.view.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsHomeViewComponent implements OnInit {
	@HostListener('scroll', ['$event'])
	onScroll(event) {
		// do tracking
		// console.log('scrolled', event.target.scrollTop);
		// Listen to click events in the component
		let tracker = event.target;

		let limit = tracker.scrollHeight - tracker.clientHeight;
		console.log(event.target.scrollTop, limit);
		if (event.target.scrollTop === limit) {
			alert('end reached');
		}
	}

	postData$: Observable<any[]>;
	constructor(
		private postService: PostService,
		public dialog: MatDialog
	) { }

	ngOnInit() {
		this.postData$ = this.postService.list();
	}

	onUpdatePostData() {
		this.postData$ = this.postService.list();
	}
}
