import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppsAdminReportView } from './report/report.view';

import { AdminRoutingModule } from './admin-routing.module';
import { AppsAdminReportTableComponent } from '../../component/admin/report/table/table.component';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
  ],
  declarations: [
    AppsAdminReportView,
    AppsAdminReportTableComponent,
  ]
})
export class AdminModule { }
