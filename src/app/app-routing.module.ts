import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppsHomeViewComponent } from './view/home/apps-home-view-component.view';
import { AppComponent } from './app.component';
const routes: Routes = [
		{
			path: 'home',
			component: AppsHomeViewComponent,
		},
		{
			path: '',
			component: AppComponent,
		}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
