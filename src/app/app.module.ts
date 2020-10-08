import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppsHomeViewComponent } from './view/home/apps-home-view-component.view';
import { AppsLoginViewComponent } from './view/login/login.view';
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
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { AppsButtonComponent } from './component/button/button.component';
import { AppsNewPostPanelComponent } from './component/NewPostPanel/new-post-panel.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import  { TimePipeComponent } from './pipe/TimePipe';
@NgModule({
  declarations: [
    AppComponent,
    AppsHomeViewComponent,
    AppsLoginViewComponent,
    AppsCommentComponent,
    AppsPostComponent,
    AppsPostDialogComponent,
    VndCurrencyPipe,
    AppsButtonComponent,
    AppsNewPostPanelComponent,
    TimePipeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTabsModule,
    MatSnackBarModule
  ],
  entryComponents: [
    AppsPostDialogComponent
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
