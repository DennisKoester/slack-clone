import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
// import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { ChannelModuleComponent } from './components/channel-module/channel-module.component';
import { TextEditorComponent } from './components/text-editor/text-editor.component';
import { ChatModuleComponent } from './components/chat-module/chat-module.component';
import { ThreadSideModuleComponent } from './components/thread-side-module/thread-side-module.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { NewChatComponent } from './components/new-chat/new-chat.component';
import { ThreadsListComponent } from './components/threads-list/threads-list.component';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';


const routes: Routes = [
  // {path: '', component: AppComponent},
  { path: '', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  // { path: 'verify-email', component: VerifyEmailComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AngularFireAuthGuard],
    children: [
      {
        path: 'threads-list',
        component: ThreadsListComponent,
        canActivate: [AngularFireAuthGuard],
      },
      {
        path: 'user-list',
        component: UserListComponent,
        canActivate: [AngularFireAuthGuard],
      },
      {
        path: 'channel/:id',
        component: ChannelModuleComponent,
        canActivate: [AngularFireAuthGuard],
      },
      {
        path: 'chat/:id',
        component: ChatModuleComponent,
        canActivate: [AngularFireAuthGuard],
      },
      {
        path: 'new-chat',
        component: NewChatComponent,
        canActivate: [AngularFireAuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
