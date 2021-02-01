import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AppsAdminInterestedUserDialogComponent } from 'src/app/component/admin/interested-user-dialog/interested-user-dialog.component';
import { AppsAdminModalComponent } from 'src/app/component/admin/modal/modal.component';
import { PostService } from 'src/app/service/post.service';

@Component({
    selector: "apps-admin-interested-user-view",
    templateUrl: './interested-user.view.html',
	styleUrls: ['./interested-user.view.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsAdminInterestedUserView {

    posts: any[] = [];
    hasNext: boolean;
    nextLink: string;
    nextPageNumber: number;
    previousPageNumber: number;

    constructor(
        private dialog: MatDialog,
        private router: Router,
        private postService: PostService
    ) {
    }

    ngOnInit(): void {
       this.load();
    }

    load(pageNumber: number = 0): void {
        this.postService.list(null, {limit: 10, page: pageNumber}).subscribe(res => {
            this.posts = res.items;
            this.hasNext = res.hasNext;
            this.nextLink = res.nextLink;
            this.nextPageNumber = parseInt(res.nextLink[res.nextLink.length - 1]);
            let previousPageNumber: number = parseInt(res.nextLink[res.nextLink.length - 1]) - 2;
            this.previousPageNumber = previousPageNumber >= 0 ? previousPageNumber : 0;
        })
    }
    
    getTypeBusinessStr(typeId: number): string {
		switch(typeId) {
			case 1:
				return 'Bán';
				break;
			case 2:
				return 'Cần mua';
				break;
			case 3:
				return 'Cho thuê';
				break;
			case 4:
				return 'Cần thuê';
				break;
			case 5:
				return 'Tìm bạn cùng phòng';
				break;
			default:
				break;
		}
    }

    getTypePorpertyStr(typeId: number): string {
        switch(typeId) {
			case 1:
				return 'Nhà đất';
				break;
			case 2:
				return 'Chung cư';
				break;
			case 3:
				return 'Phòng trọ';
				break;
			default:
				break;
		}
    }

    navigatePost(id: number): void {
		  this.router.navigateByUrl(`post/${id}`);
    }

    nextPage(nextPageNumber: number): void {
		  this.load(nextPageNumber);
    }

    openUserList(id: number): void {
      const dialogRef = this.dialog.open(AppsAdminInterestedUserDialogComponent, {
        width: '650px',
        data: {
			id: id
        }
        });
    }
}