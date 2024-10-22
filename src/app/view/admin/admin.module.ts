import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppsAdminReportView } from './report/report.view';

import { AdminRoutingModule } from './admin-routing.module';
import { AppsAdminReportTableComponent } from '../../component/admin/report/table/table.component';
import { AppsAdminTypeReportView } from './type-report/type-report.view';
import { AppsAdminTypeReportTableComponent } from 'src/app/component/admin/type-report/table/table.component';
import { AppsAdminTypeReportDialogComponent } from 'src/app/component/admin/type-report/dialog/dialog.component';
import { MatButtonModule, MatCardModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatMenuModule, MatNativeDateModule, MatProgressSpinnerModule, MatSelectModule, MatSnackBarModule, MatTabsModule, MatTooltipModule } from '@angular/material';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { AppsAdminRecommendView } from './recommend/recommend.view';
import { AppsAdminRecommendTableComponent } from 'src/app/component/admin/recommend/table/table.component';
import { AppsAdminRecommendDialogComponent } from 'src/app/component/admin/recommend/dialog/dialog.component';
import { AppsAdminRecommendActionDialogComponent } from 'src/app/component/admin/recommend/action-dialog/action-dialog.component';
import { AppsAdminDashboardView } from './dashboard/dashboard.view';
import { AppsAdminInterestedUserView } from './interested-user/interested-user.view';
import { AppsAdminInterestedUserDialogComponent } from 'src/app/component/admin/interested-user-dialog/interested-user-dialog.component';
@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatTabsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MaterialFileInputModule,
    MatTooltipModule,
    MatCardModule,
    MatNativeDateModule,
    
  ],
  entryComponents: [
    AppsAdminTypeReportDialogComponent,
    AppsAdminRecommendDialogComponent,
    AppsAdminRecommendActionDialogComponent,
    AppsAdminInterestedUserDialogComponent
  ],
  declarations: [
    AppsAdminReportView,
    AppsAdminReportTableComponent,
    AppsAdminTypeReportTableComponent,
    AppsAdminTypeReportView,
    AppsAdminTypeReportDialogComponent,
    AppsAdminRecommendTableComponent,
    AppsAdminRecommendView,
    AppsAdminRecommendDialogComponent,
    AppsAdminRecommendActionDialogComponent,
    AppsAdminDashboardView,
    AppsAdminInterestedUserView,
    AppsAdminInterestedUserDialogComponent
  ]
})
export class AdminModule { }
