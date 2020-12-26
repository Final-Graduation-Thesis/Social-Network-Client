import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppsAdminReportView } from './report.view';

import { ReportRoutingModule } from './report-routing.module';
import { AppsAdminReportComponent } from '../../../component/admin/report/report.component';
@NgModule({
  imports: [
    CommonModule,
    ReportRoutingModule,
    FormsModule,
  ],
  declarations: [
    AppsAdminReportView,
    AppsAdminReportComponent

  ]
})
export class ReportModule { }
