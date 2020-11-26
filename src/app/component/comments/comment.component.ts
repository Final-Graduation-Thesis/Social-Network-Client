import { CdkCell } from '@angular/cdk/table';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, Input, ViewEncapsulation, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { MatFormField, MatInput } from '@angular/material';
import { CommentService } from '../../service/comment.service';
@Component({
	selector: 'apps-comment-component',
	templateUrl: './comment.component.html',
	styleUrls: ['./comment.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsCommentComponent implements OnInit {

	@Input() postId: number;
	commentOfPost: any;
	comment: any;
	avatar: string;
	photosList = `https://i.imgur.com/nXgEtSy.jpg`;
	@ViewChild('commentInput') commentInput: ElementRef;
	constructor(
		private commentService: CommentService,
		private renderer: Renderer2
		) {}

	ngOnInit() {
		this.avatar = localStorage.getItem('avatar');
		this.commentService.get(this.postId).subscribe(res => {
			this.commentOfPost = res ? res.items : []
			this.comment = res ? res : {}
		});
	}

	onEnterComment(evt: KeyboardEvent): void {
		let body: any = {
			"content": this.commentInput.nativeElement.value,
			"postId": this.postId
		}
		this.commentService.post(body).subscribe(res => {
			this.commentService.get(this.postId).subscribe(res => 
				{
					this.commentOfPost = res ? res.items : []
					this.comment = res ? res : {}
				});});
		this.commentInput.nativeElement.value = "";
		this.commentInput.nativeElement.blur();
	}

	loadMore(): void {
		const nextLink = '/social' + this.comment.nextLink;
		this.commentService.list(nextLink).subscribe(res => {
			this.commentOfPost = [...this.commentOfPost, ...res.items];
			this.comment = res ? res : {}
		});
	}
}
