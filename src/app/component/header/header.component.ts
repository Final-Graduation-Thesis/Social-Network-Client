import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from 'src/app/service/auth.service';
import { NotificationService } from 'src/app/service/notification.service';
import { ReloadService } from 'src/app/service/reload.service';
import { UserService } from 'src/app/service/user.service';
import { WebSocketService } from 'src/app/service/websocket.service';
import { AppsChatPanelComponent } from 'src/app/component/chat/chat-panel.component';
import { MatDialog } from '@angular/material';
import { AppsEventDialogComponent } from './event-dialog/event-dialog.component';
import { ReadNotificationService } from 'src/app/service/read-notification.service';

@Component({
	selector: 'apps-ui-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsHeaderComponent {
	isLoginView: boolean = true;
	navLinks: any = [
		{
			path: '',
			label: 'home'
		},
		{
			path: '/map',
			label: 'explore'

		},
		{
			path: '/sd',
			label: 'textsms'
		}
	]

	notifications: any[] = [];
	countNoti: number = 0;
	user: any;
	constructor(
		public router: Router,
		private authService: AuthService,
		private reloadService: ReloadService,
		private webSocketService: WebSocketService,
		private notificationService: NotificationService,
		private userService: UserService,
		private dialog: MatDialog,
		private readNotiService: ReadNotificationService
	) { }

	ngOnInit(): void {
		this.notificationService.list().subscribe((res) => {
			this.notifications = res.items;
			this.notifications.forEach(noti => {
				!noti.markAsRead ? this.countNoti++ : '';
			});
		});
		this.user = this.userService.getInfo();
		let stompClient = this.webSocketService.connect();
        setTimeout(() => {
			stompClient.connect({}, frame => {
				let url: string = `/user/${localStorage.getItem("username")}/notification/social`;
				stompClient.subscribe(url, notification => {
					let noti: any = JSON.parse(notification.body)
					this.notifications.unshift(noti);
					this.countNoti++;
				});
			});
		});
	}
	onClickIndex(): void {
		this.reloadService.reloadPost(true);
	}

	logout(): void {
		this.authService.logout();
		this.router.navigateByUrl("/login");
	}

	onClickPost(noti: any, index: number): void {
		let chat = AppsChatPanelComponent.instance;
		switch(noti.type) {
			case 1:
			case 2:
			case 3:
				this.router.navigateByUrl(noti.url);
				break;
			case 4:
				this.userService.get(noti.secondUserId).subscribe(res => {
					chat.openChatDialog(res);
				})
				break;
			case 5:
				const dialogRef = this.dialog.open(AppsEventDialogComponent, {
					width: '350px',
					data: {
					}
				  });
				break;
			default:
				break;
		}
		console.log(index);
		this.readNotiService.markAsRead('', noti.id).subscribe(res => {
		});
		this.notifications[index].markAsRead = true;

	}

	clearNotiCount(): void {
		this.readNotiService.markAsRead('/social/notification/markAsRead/all/').subscribe(res => {});
		this.countNoti = 0;
	}

	directToTimeline(): void {
		this.router.navigateByUrl(`timeline/${localStorage.getItem('user_id')}`);
	}
}
