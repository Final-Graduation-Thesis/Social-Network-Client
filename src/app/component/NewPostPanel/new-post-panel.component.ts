import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { PostService } from '../../service/post.service';
import { AppsPostDialogComponent } from '../../component/posts/CreatePostDialog/post-dialog.component';

@Component({
	selector: 'apps-new-post-panel-component',
	templateUrl: './new-post-panel.component.html',
	styleUrls: ['./new-post-panel.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsNewPostPanelComponent implements OnInit {

	constructor(
        private postService: PostService,
		private dialog: MatDialog
    ) {}

	ngOnInit() {
	}

    openDialog(): void {
        const dialogRef = this.dialog.open(AppsPostDialogComponent, {
			width: '450px'
		  });
    }
}
