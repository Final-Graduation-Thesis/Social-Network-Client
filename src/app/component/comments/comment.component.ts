import { CdkCell } from '@angular/cdk/table';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { CommentService } from '../../service/comment.service';
@Component({
	selector: 'apps-comment-component',
	templateUrl: './comment.component.html',
	styleUrls: ['./comment.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsCommentComponent implements OnInit {

	@Input() postId: number;
	commentsData: any;
	photosList = `https://i.imgur.com/nXgEtSy.jpg`;

	constructor(
		private commentService: CommentService
		) {}

	ngOnInit() {
		console.log(this.postId);
		let params = new HttpParams();
		params = params.append('postId', this.postId.toString());
		this.commentService.list(params).subscribe(res => 
			{
				console.log(res);
				this.commentsData = res[0] ? res[0].items : []
				console.log(this.commentsData);
			});
	}

}
