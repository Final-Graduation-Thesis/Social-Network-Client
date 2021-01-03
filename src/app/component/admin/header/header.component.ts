import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: "apps-admin-header",
    templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsAdminHeaderComponent implements OnInit {

    username: string;
    ngOnInit(): void {
        this.username = localStorage.getItem('username');
    }
}