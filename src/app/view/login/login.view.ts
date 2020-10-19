import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
@Component({
	selector: 'apps-login-component',
	templateUrl: './login.view.html',
	styleUrls: ['./login.view.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsLoginViewComponent implements OnInit {

	loginForm: FormGroup;
	isLogin: boolean = true;
	constructor(
		private authService: AuthService,
		private fb: FormBuilder
	) { }

	ngOnInit() {
		this.loginForm = this.fb.group({
			"email": "",
			"password": ""
		}
		)
	}
	login(): void {
		console.log(this.loginForm.value);
		this.authService.login("tanduyht@gmail.com", "abc123").subscribe();
	}
	register(): void {
		console.log('register')
	}
	
	toggleLogin(): void {
		this.isLogin = !this.isLogin;
	}
}
