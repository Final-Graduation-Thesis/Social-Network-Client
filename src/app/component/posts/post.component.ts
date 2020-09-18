import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { PostService } from '../../service/post.service';
@Component({
	selector: 'apps-post-component',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsPostComponent implements OnInit {

	photosList = [
		{ src: `https://i.imgur.com/nXgEtSy.jpg` },
		{ src: `https://i.imgur.com/FcxINEt.jpg` },
		{ src: `https://i.imgur.com/bJiRyI1.jpg` },
		{ src: `https://i.imgur.com/eqhxhmi.jpg` },

	]

	constructor(
		private postService: PostService
		) {}

	ngOnInit() {
		this.postService.list().subscribe(res => console.log(res));
	}

}
