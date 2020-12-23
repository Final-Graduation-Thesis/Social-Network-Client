import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppsHomeViewComponent } from './view/home/apps-home-view-component.view';
import { AppComponent } from './app.component';
import { AppsLoginViewComponent } from './view/login/login.view';
import { AppsTimeLineView } from './view/timeline/timeline.view';
import { AppsDetailPostView } from './view/detail-post/detail-post.view';
import { AppsChatView } from 'src/app/view/chat/chat.view';
import { AppsMapView } from 'src/app/view/map/map.view';
import { AuthGuardService } from './service/authGuard.service';
import { AppsSavedPostView } from './view/saved-post/saved-post.view';
import { AppsAdminIndexView } from './view/admin/index.view';

const routes: Routes = [
		{
			path: 'home',
			component: AppComponent
		},
		{
			path: '',
			component: AppsHomeViewComponent,
			canActivate: [AuthGuardService]
		},
		{
			path: 'login',
			component: AppsLoginViewComponent
		},
		{
			path: 'timeline/:id',
			component: AppsTimeLineView,
			canActivate: [AuthGuardService]
		},
		{
			path: 'post/:id',
			component: AppsDetailPostView,
			canActivate: [AuthGuardService]
		},
		{
			path: 'chat',
			component: AppsChatView,
			canActivate: [AuthGuardService]
		},
		{
			path: 'map',
			component: AppsMapView,
			canActivate: [AuthGuardService]
		},
		{
			path: 'saved',
			component: AppsSavedPostView,
			canActivate: [AuthGuardService]
		},
		{
			path: 'admin',
			component: AppsAdminIndexView,
			canActivate: [AuthGuardService]
		}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
