import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppsHomeViewComponent } from './view/home/apps-home-view-component.view';
import { AppsLoginViewComponent } from './view/login/login.view';
import { AppsCommentComponent } from './component/comments/index';
import { AppsPostComponent } from './component/posts/index';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { HttpConfigInterceptor } from 'src/app/httpconfig.interceptor';
import { VndCurrencyPipe } from './pipe/VndCurrency';
import { AppsPostDialogComponent } from './component/posts/CreatePostDialog/post-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { AppsButtonComponent } from './component/button/button.component';
import { AppsNewPostPanelComponent } from './component/NewPostPanel/new-post-panel.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TimePipeComponent } from './pipe/TimePipe';
import { AppsSearchComponent } from './component/search/search.component'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AppsHeaderComponent } from './component/header/header.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { AppsTimeLineView } from './view/timeline/timeline.view';
import { ReloadService } from 'src/app/service/reload.service';
import { AppsDetailPostView } from 'src/app/view/detail-post/detail-post.view';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WebSocketService } from 'src/app/service/websocket.service';
import { MatBadgeModule } from '@angular/material/badge';
import { PubNubAngular } from 'pubnub-angular2';
import { AppsChatView } from 'src/app/view/chat/chat.view';
import { AppsChatPanelComponent } from 'src/app/component/chat/chat-panel.component';
import { AppsChatDialogComponent } from 'src/app/component/chat/chat-dialog/chat-dialog.component';
import { AppsChatOutletComponent } from 'src/app/component/chat/chat-outlet.component';
@NgModule({
  declarations: [
    AppComponent,
    AppsHomeViewComponent,
    AppsLoginViewComponent,
    AppsDetailPostView,
    AppsCommentComponent,
    AppsPostComponent,
    AppsPostDialogComponent,
    AppsChatPanelComponent,
    AppsChatDialogComponent,
    VndCurrencyPipe,
    AppsButtonComponent,
    AppsNewPostPanelComponent,
    TimePipeComponent,
    AppsSearchComponent,
    AppsHeaderComponent,
    AppsTimeLineView,
    AppsChatView,
    AppsChatOutletComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
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
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MaterialFileInputModule,
    MatTooltipModule,
    MatBadgeModule
  ],
  entryComponents: [
    AppsPostDialogComponent,
    AppsChatDialogComponent
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    ReloadService,
    WebSocketService,
    PubNubAngular
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
