import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'apps-comment-component',
	templateUrl: './comment.component.html',
	styleUrls: ['./comment.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsCommentComponent implements OnInit {

	photosList = `https://i.imgur.com/nXgEtSy.jpg`;

	constructor(
		) {}

	ngOnInit() {
	}

}
