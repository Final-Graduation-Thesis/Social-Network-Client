import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: "apps-admin-index-view",
    templateUrl: './index.view.html',
	styleUrls: ['./index.view.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsAdminIndexView {
    navItems: any[] = [
        {
            name: 'Colors',
            url: '/theme/colors',
            icon: 'icon-drop'
          },
          {
            name: 'Typography',
            url: '/theme/typography',
            icon: 'icon-pencil'
          },

    ]
    ngOnInit() {
    }
    
}