import { HttpParams } from '@angular/common/http';
import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/service/post.service';
import { ReloadService } from 'src/app/service/reload.service';
import { SearchService } from 'src/app/service/search.service';
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
	nextLink: string;
	userId: string;
	constructor(
		private searchService: SearchService,
		public dialog: MatDialog,
		private userService: UserService,
		private activatedRoute: ActivatedRoute,
		private reloadService: ReloadService
	) { }

	ngOnInit() {
		this.activatedRoute.paramMap.subscribe(params => {
			this.userService.get(parseInt(params.get('id'))).subscribe(res => {
				this.user = res;
			})
		});
		this.reload();
		this.reloadService.onReloadPost().subscribe(isReload => {
			this.reload();
		})
	}

	reload(): void {
		this.activatedRoute.paramMap.subscribe(params => {
			let body: HttpParams = new HttpParams()
			.set('userId', params.get('id'));
			this.searchService.list(this.searchService.url, body).subscribe(res => {
				this.postData = res.items;
				this.hasNext = res.hasNext;
				this.nextLink = res.nextLink;
			})
		});
	}

	onUpdatePostData() {
		this.reload();
	}
}
