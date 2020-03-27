import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// DEMO PAGES

// Pages

import { ForgotPasswordBoxedComponent } from './forgot-password-boxed/forgot-password-boxed.component';
import { LoginBoxedComponent } from './login-boxed/login-boxed.component';
import { RegisterBoxedComponent } from './register-boxed/register-boxed.component';

import { CreatetaskComponent } from './createtask/createtask.component';
import { UpdatetaskComponent } from './updatetask/updatetask.component';
import { AssigntaskComponent } from './assigntask/assigntask.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { IndexComponent } from './index/index.component';
import { UserpanelComponent } from './userpanel/userpanel.component';
import { UsertaskupdateComponent } from './usertaskupdate/usertaskupdate.component';
import { UserprofileComponent } from './userprofile/userprofile.component';

const routes: Routes = [
  {
    path: 'home',
    component: AnalyticsComponent
  },
  {
    path: 'user',
    component: UserpanelComponent
  },
  {
    path: 'createtask',
    component: CreatetaskComponent
  },
  {
    path: 'updatetask',
    component: UpdatetaskComponent
  },
  {
    path: 'usertaskupdate',
    component: UsertaskupdateComponent
  },
  {
    path: 'assigntask',
    component: AssigntaskComponent
  },
  {
    path: 'profile',
    component: UserprofileComponent
  },
  {
    path: 'login',
    component: LoginBoxedComponent
  },
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: 'register',
    component: RegisterBoxedComponent
  },
  {
    path: 'forgot',
    component: ForgotPasswordBoxedComponent
  },
  {
    path: '**',
    redirectTo: 'index',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
