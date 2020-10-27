import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from 'src/app/service/auth.service';
import { ReloadService } from 'src/app/service/reload.service';
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

	constructor(
		public router: Router,
		private authService: AuthService,
		private reloadService: ReloadService
	) { }

	ngOnInit(): void {
	}
	onClickIndex(): void {
		this.reloadService.reloadPost(true);
	}

	logout(): void {
		this.authService.logout();
		this.router.navigateByUrl("/login");
	}
}
