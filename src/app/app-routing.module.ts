import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppsHomeViewComponent } from './view/home/apps-home-view-component.view';
import { AppComponent } from './app.component';
import { AppsLoginViewComponent } from './view/login/login.view';
import { AppsTimeLineView } from './view/timeline/timeline.view';
const routes: Routes = [
		{
			path: 'home',
			component: AppComponent
		},
		{
			path: '',
			component: AppsHomeViewComponent,
		},
		{
			path: 'login',
			component: AppsLoginViewComponent
		},
		{
			path: 'timeline',
			component: AppsTimeLineView
		}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
