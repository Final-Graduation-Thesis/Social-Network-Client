import { Component, OnInit } from '@angular/core';

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
	) {
		this.postService.list().subscribe((res: any) => {
			console.log(res);
			this.postData = res.items
		});
	}

	ngOnInit() {
		console.log(this.postData);
	}

}
