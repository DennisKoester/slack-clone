import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';

//firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/compat/auth-guard';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AuthenticationService } from './shared/services/authentication.service';
import { environment } from '../environments/environment';

//Material Design
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

//components
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { ChannelsComponent } from './components/channels/channels.component';
import { DirectMessagesSectionComponent } from './components/direct-messages-section/direct-messages-section.component';
import { SignFooterComponent } from './components/sign-footer/sign-footer.component';
import { SignHeaderComponent } from './components/sign-header/sign-header.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { DialogCreateChannelComponent } from './components/dialog-create-channel/dialog-create-channel.component';
import { ThreadCardComponent } from './components/thread-card/thread-card.component';
import { TextEditorComponent } from './components/text-editor/text-editor.component';
import { ChannelItemComponent } from './components/channel-item/channel-item.component';
import { ChannelModuleComponent } from './components/channel-module/channel-module.component';
import { ThreadSideModuleComponent } from './components/thread-side-module/thread-side-module.component';
import { DialogEditUserComponent } from './components/dialog-edit-user/dialog-edit-user.component';
import { ChatlistItemComponent } from './components/chatlist-item/chatlist-item.component';
import { ChatModuleComponent } from './components/chat-module/chat-module.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { NewChatComponent } from './components/new-chat/new-chat.component';
import { ThreadsListComponent } from './components/threads-list/threads-list.component';
import { LegalsComponent } from './components/legals/legals.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    HeaderComponent,
    MainComponent,
    ChannelsComponent,
    DirectMessagesSectionComponent,
    SignFooterComponent,
    SignHeaderComponent,
    ForgotPasswordComponent,
    DialogCreateChannelComponent,
    ThreadCardComponent,
    TextEditorComponent,
    ChannelItemComponent,
    ChannelModuleComponent,
    ThreadSideModuleComponent,
    DialogEditUserComponent,
    ChatlistItemComponent,
    ChatModuleComponent,
    UserListComponent,
    UserCardComponent,
    NewChatComponent,
    ThreadsListComponent,
    LegalsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRadioModule,
    MatDialogModule,
    MatCheckboxModule,
    FormsModule,
    QuillModule.forRoot(),
    MatMenuModule,
    MatTooltipModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    AngularFireAuthGuardModule,
  ],
  providers: [
    AuthenticationService,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
