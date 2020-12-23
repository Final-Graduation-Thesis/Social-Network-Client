import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/service/post.service';
import { ReadNotificationService } from 'src/app/service/read-notification.service';

@Component({
	selector: 'apps-saved-post-view',
	templateUrl: './saved-post.view.html',
	styleUrls: ['./saved-post.view.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsSavedPostView implements AfterViewInit {

    postList: any;
    constructor(
        private postService: PostService,
        private router: Router,
        private readNotiService: ReadNotificationService
    ) {
    }

    ngAfterViewInit(): void {
        this.postService.list('/social/post/savedPost/').subscribe((res) => {
                this.postList = res;
            }
        )
    }

    isTypeBS13(post: any) {
		if (!post) return;
		if (post.typeBusiness === 1 || post.typeBusiness === 3) {
			return true;
		}
		return false;
	}

	navigateToPost(id: any) {
        this.readNotiService.readDetail('/social/notification/read/detail/', id).subscribe(res => {});
		this.router.navigateByUrl(`/post/${id}`);
	}
}