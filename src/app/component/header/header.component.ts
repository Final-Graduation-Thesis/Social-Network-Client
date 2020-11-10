import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from 'src/app/service/auth.service';
import { NotificationService } from 'src/app/service/notification.service';
import { ReloadService } from 'src/app/service/reload.service';
import { UserService } from 'src/app/service/user.service';
import { WebSocketService } from 'src/app/service/websocket.service';
@Component({
	selector: 'header',
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
			path: '/asd',
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
		private userService: UserService
	) { }

	ngOnInit(): void {
		this.notificationService.list().subscribe((res) => {
			this.notifications = res.items;
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

	navigatePost(url: string): void {
		this.router.navigateByUrl(url);
	}

	clearNotiCount(): void {
		this.countNoti = 0;
	}
}
