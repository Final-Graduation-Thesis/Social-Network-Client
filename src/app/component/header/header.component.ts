import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router'
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
