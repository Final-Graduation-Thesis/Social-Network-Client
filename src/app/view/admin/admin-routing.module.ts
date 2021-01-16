import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppsAdminDashboardView } from './dashboard/dashboard.view';
import { AppsAdminRecommendView } from './recommend/recommend.view';

import { AppsAdminReportView } from './report/report.view';
import { AppsAdminTypeReportView } from './type-report/type-report.view';

const routes: Routes = [
	{
		path: '',
		children: [

			{
				path: 'report',
				component: AppsAdminReportView,
			},
			{
				path: 'type-report',
				component: AppsAdminTypeReportView
			},
			{
				path: 'recommend',
				component: AppsAdminRecommendView
			},
			{
				path: 'dashboard',
				component: AppsAdminDashboardView
			},
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule { }
