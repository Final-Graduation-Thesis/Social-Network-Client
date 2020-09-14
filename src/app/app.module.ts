import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppsHomeViewComponent } from './view/home/apps-home-view-component.view';
import { AppsPostComponent } from './component/posts/index'

@NgModule({
  declarations: [
    AppComponent,
    AppsHomeViewComponent,
    AppsPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
