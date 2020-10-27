import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { PostService } from 'src/app/service/post.service';

@Component({
	selector: 'apps-detail-post-view',
	templateUrl: './detail-post.view.html',
	styleUrls: ['./detail-post.view.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsTimeLineView implements OnInit {

	constructor(
		private router: Router,
		private postService: PostService,
		public dialog: MatDialog
	) { }

	ngOnInit() {
	}

}
