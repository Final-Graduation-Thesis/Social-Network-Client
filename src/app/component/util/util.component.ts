import {
	Component, OnInit, ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'apps-util-component',
	templateUrl: './util.component.html',
	styleUrls: ['./util.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class AppsUtilComponent {
    constructor(
        private router: Router
    ) {}

    navigateToSaved(): void {
        this.router.navigateByUrl(`/saved`);
    }
}