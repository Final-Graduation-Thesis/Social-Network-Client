import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'apps-button-component',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsButtonComponent implements OnInit {

    @Input('title') title: string;
	constructor() {}

	ngOnInit() {
	}

}
