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
	forbidHeader = ['/admin', '/login'];
	constructor(
		private router: Router
	) { }

	ngOnInit(): void {
		console.log(this.router.url);
		console.log(window.location.pathname );
	}

}
