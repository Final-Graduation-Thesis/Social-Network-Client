import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
@Component({
	selector: 'apps-login-component',
	templateUrl: './login.view.html',
	styleUrls: ['./login.view.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsLoginViewComponent implements OnInit {

	loginForm: FormGroup;
	registerForm: FormGroup;
	isLogin: boolean = true;
	constructor(
		private authService: AuthService,
		private router: Router,
		private fb: FormBuilder
	) { }

	ngOnInit() {
		this.loginForm = this.fb.group({
			"email": "",
			"password": ""
		}
		);
		this.registerForm = this.fb.group({
			"email": "",
			"password": "",
			"username": ""
		}
		)
	}
	login(): void {
		this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(res => {
			this.router.navigateByUrl('/');
		});
	}
	register(): void {
		let body: any = {
			'email': this.registerForm.value.email,
			'password': this.registerForm.value.password,
			'username': this.registerForm.value.username
		}
		this.authService.register(body).subscribe(
			res => {
			alert('Đăng kí thành công. email: ' + body.get('email') + 'password: ' + body.get('password'));
		}
		)
	}
	
	toggleLogin(): void {
		this.isLogin = !this.isLogin;
	}
}
