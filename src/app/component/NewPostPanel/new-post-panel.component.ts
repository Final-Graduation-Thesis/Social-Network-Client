import { AfterViewInit, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { AppsPostDialogComponent } from '../../component/posts/CreatePostDialog/post-dialog.component';

@Component({
	selector: 'apps-new-post-panel-component',
	templateUrl: './new-post-panel.component.html',
	styleUrls: ['./new-post-panel.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsNewPostPanelComponent implements OnInit {

	avatar: string;
	constructor(
		private dialog: MatDialog,
		private authService: AuthService,
		private userService: UserService
    ) {}

	ngOnInit(): void {
		this.userService.get(parseInt(localStorage.getItem('user_id'))).subscribe(res => {
			this.avatar = res.avatar;
		});
	}

    openDialog(): void {
        const dialogRef = this.dialog.open(AppsPostDialogComponent, {
			width: '450px',
			data: {
			}
		  });
    }
}
