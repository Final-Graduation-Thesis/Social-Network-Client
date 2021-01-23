import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router'
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppComponent {
	// @HostListener('scroll', '$event') 
	// onScroll 
	isLoginView: boolean = true;
	title = 'MyLand';
	url: any = window.location.pathname;
	isAdmin : boolean;
	constructor(
		private router: Router
	) { }

	ngOnInit(): void {
		this.isAdmin = this.url.startsWith('/admin') || this.url.startsWith('/login') || this.url.startsWith('/login?return=%2F');
	}

}
