import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppsHomeViewComponent } from './view/home/apps-home-view-component.view';
import { AppsCommentComponent } from './component/comments/index';
import { AppsPostComponent } from './component/posts/index';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule }    from '@angular/common/http';
import { VndCurrencyPipe } from './pipe/VndCurrency';
import { AppsPostDialogComponent } from './component/posts/CreatePostDialog/post-dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    AppsHomeViewComponent,
    AppsCommentComponent,
    AppsPostComponent,
    AppsPostDialogComponent,
    VndCurrencyPipe
  ],
  imports: [
    BrowserModule,    
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule
  ],
  entryComponents: [
    AppsPostDialogComponent
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
