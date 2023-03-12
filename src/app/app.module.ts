import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//firebase neu
// import { environment } from '../environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
// import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

//firebase alt
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
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

//components
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ThreadSideModuleComponent } from './components/thread-side-module/thread-side-module.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ChannelsComponent } from './components/channels/channels.component';
import { DirectMessagesSectionComponent } from './components/direct-messages-section/direct-messages-section.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { SignFooterComponent } from './components/sign-footer/sign-footer.component';
import { SignHeaderComponent } from './components/sign-header/sign-header.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { DialogCreateChannelComponent } from './components/dialog-create-channel/dialog-create-channel.component';
import { MessageCardComponent } from './components/message-card/message-card.component';
import { TextEditorComponent } from './components/text-editor/text-editor.component';
import { ChannelItemComponent } from './components/channel-item/channel-item.component';
import { OpenChannelComponent } from './components/open-channel/open-channel.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    HeaderComponent,
    ThreadSideModuleComponent,
    SideNavComponent,
    ChannelsComponent,
    DirectMessagesSectionComponent,
    VerifyEmailComponent,
    SignFooterComponent,
    SignHeaderComponent,
    ForgotPasswordComponent,
    DialogCreateChannelComponent,
    MessageCardComponent,
    TextEditorComponent,
    ChannelItemComponent,
    OpenChannelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // CommonModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAuth(() => getAuth()),
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
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
