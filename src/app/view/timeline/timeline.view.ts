import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';

@Component({
	selector: 'apps-timeline-view',
	templateUrl: './timeline.view.html',
	styleUrls: ['./timeline.view.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsTimeLineView implements OnInit {
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
	user: any;
	constructor(
		private router: Router,
		private postService: PostService,
		public dialog: MatDialog,
		private userService: UserService
	) { }

	ngOnInit() {
		this.user = this.userService.getInfo(); // TODO
		this.postService.list().subscribe(res => {this.postData = res.items;});
	}

	onUpdatePostData() {
		this.postService.list().subscribe(res => this.postData = res.items);
	}
}
