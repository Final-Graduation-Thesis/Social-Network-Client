import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'apps-login-component',
	templateUrl: './login.view.html',
	styleUrls: ['./login.view.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsLoginViewComponent implements OnInit {

	isLogin: boolean = true;
	constructor(
	) { }

	ngOnInit() {
	}
	login(): void {
		console.log('ádasd');
	}
	register(): void {
		console.log('register')
	}
	
	toggleLogin(): void {
		this.isLogin = !this.isLogin;
	}
}
