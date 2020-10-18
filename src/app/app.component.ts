import { Component, ViewEncapsulation, HostListener } from '@angular/core';
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

	constructor(
	) { }

	ngOnInit(): void {
	}

}
