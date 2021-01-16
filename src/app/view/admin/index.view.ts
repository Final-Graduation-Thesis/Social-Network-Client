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
            name: 'Trang chủ',
            url: '/admin/dashboard',
            icon: 'icon-drop'
          },
          {
            name: 'Bài viết bị báo cáo',
            url: '/admin/report',
            icon: 'icon-drop'
          },
          {
            name: 'Loại báo cáo',
            url: '/admin/type-report',
            icon: 'icon-pencil'
          },
          {
            name: 'Hệ thống kết nối gợi ý',
            url: '/admin/recommend',
            icon: 'icon-pencil'
          },
    ]
  
    username: string;
    ngOnInit() {
      this.username = localStorage.getItem('username');
    }
    
}