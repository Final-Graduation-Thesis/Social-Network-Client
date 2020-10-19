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
	photosList = `https://i.imgur.com/nXgEtSy.jpg`;
	@ViewChild('commentInput') commentInput: ElementRef;
	constructor(
		private commentService: CommentService,
		private renderer: Renderer2
		) {}

	ngOnInit() {
		this.commentService.get(this.postId).subscribe(res => 
			{
				this.commentOfPost = res ? res.items : []
				this.comment = res ? res : {}
			});
	}

	onEnterComment(evt: KeyboardEvent): void {
		this.commentOfPost.push(
			{
				"content": this.commentInput.nativeElement.value,
				"createdAt": Date.now()
			}
		)
		this.commentInput.nativeElement.value="";
		this.commentInput.nativeElement.blur();
		
	}

}
