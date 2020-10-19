import { Component, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppsPostDialogComponent } from '../../component/posts/CreatePostDialog/post-dialog.component';
import { PostService } from '../../service/post.service';
import { Observable} from 'rxjs'
import { Router } from '@angular/router';
@Component({
	selector: 'apps-home-view-component',
	templateUrl: './apps-home-view-component.view.html',
	styleUrls: ['./apps-home-view-component.view.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsHomeViewComponent implements OnInit {
	@HostListener("window:scroll", [])
		onWindowScroll() {
			let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight;
			let max = document.documentElement.scrollHeight;
			if(pos == max )   {
				this.hasNext = false;
			}
		}
	hasNext: boolean = true;
	postData: any;
	constructor(
		private router: Router,
		private postService: PostService,
		public dialog: MatDialog
	) { }

	ngOnInit() {
		this.postService.list().subscribe(res => {this.postData = res.items; console.log(res)});
	}

	onUpdatePostData() {
		this.postService.list().subscribe(res => this.postData = res.items);
	}

	reload() {
		this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
			this.router.navigate(['']);
		});
	}
}
