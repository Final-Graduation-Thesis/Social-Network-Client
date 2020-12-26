import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppsAdminReportView } from './report.view';

const routes: Routes = [
  {
        path: '',
       children: [
           {
               path: 'report',
               component: AppsAdminReportView
           }
       ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule {}
