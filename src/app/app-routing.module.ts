import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { ChannelModuleComponent } from './components/channel-module/channel-module.component';
import { ChatModuleComponent } from './components/chat-module/chat-module.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { NewChatComponent } from './components/new-chat/new-chat.component';
import { ThreadsListComponent } from './components/threads-list/threads-list.component';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';


const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },

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

const config = {
  onSameUrlNavigation: 'reload',
  scrollPositionRestoration: 'enabled',
  useHash: false,
  anchorScrolling: 'enabled',
  scrollBehavior: 'smooth',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config as ExtraOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
