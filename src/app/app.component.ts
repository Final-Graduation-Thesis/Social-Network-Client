import { Component } from '@angular/core';
import { Router } from '@angular/router'
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	isLoginView: boolean = true;
	title = 'Social-Network-Client';
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
		public router: Router
	) { }

	ngOnInit(): void {
	}
	onClickIndex(): void {
		this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
			this.router.navigate(['']);
		});
	}
}
