import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgReduxModule } from '@angular-redux/store';
import { NgRedux, DevToolsExtension } from '@angular-redux/store';
import { rootReducer, ArchitectUIState } from './ThemeOptions/store';
import { ConfigActions } from './ThemeOptions/store/config.actions';
import { AppRoutingModule } from './app-routing.module';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

// BOOTSTRAP COMPONENTS

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ChartsModule } from 'ng2-charts';

// LAYOUT
import { PageTitleComponent } from './page-title/page-title.component';

// HEADER

import { HeaderComponent } from './header/header.component';
import { SearchBoxComponent } from './header/elements/search-box/search-box.component';
import { UserBoxComponent } from './header/elements/user-box/user-box.component';

// SIDEBAR

import { SidebarComponent } from './sidebar/sidebar.component';

// FOOTER

import { FooterComponent } from './footer/footer.component';

// DEMO PAGES

// Dashboards

import { AnalyticsComponent } from './analytics/analytics.component';

// Pages

import { ForgotPasswordBoxedComponent } from './forgot-password-boxed/forgot-password-boxed.component';
import { LoginBoxedComponent } from './login-boxed/login-boxed.component';
import { RegisterBoxedComponent } from './register-boxed/register-boxed.component';
import { IndexComponent } from './index/index.component';
import { CreatetaskComponent } from './createtask/createtask.component';
import { UpdatetaskComponent } from './updatetask/updatetask.component';
import { AssigntaskComponent } from './assigntask/assigntask.component';
import { UserpanelComponent } from './userpanel/userpanel.component';
import { UsertaskupdateComponent } from './usertaskupdate/usertaskupdate.component';
import { UserprofileComponent } from './userprofile/userprofile.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [

    // LAYOUT

    AppComponent,
    PageTitleComponent,

    // HEADER

    HeaderComponent,
    SearchBoxComponent,
    UserBoxComponent,

    // SIDEBAR

    SidebarComponent,

    // FOOTER

    FooterComponent,

    // DEMO PAGES

    // Dashboards

    AnalyticsComponent,
    IndexComponent,
    CreatetaskComponent,
    UpdatetaskComponent,
    AssigntaskComponent,
    // User Pages

    ForgotPasswordBoxedComponent,
    LoginBoxedComponent,
    RegisterBoxedComponent,
    UserpanelComponent,
    UsertaskupdateComponent,
    UserprofileComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgReduxModule,
    CommonModule,
    LoadingBarRouterModule,

    // Angular Bootstrap Components

    PerfectScrollbarModule,
    NgbModule,
    AngularFontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    // Charts

    ChartsModule,
  ],
  providers: [
    {
      provide:
        PERFECT_SCROLLBAR_CONFIG,
      // DROPZONE_CONFIG,
      useValue:
        DEFAULT_PERFECT_SCROLLBAR_CONFIG,
      // DEFAULT_DROPZONE_CONFIG,
    },
    ConfigActions,
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private ngRedux: NgRedux<ArchitectUIState>,
              private devTool: DevToolsExtension) {

    this.ngRedux.configureStore(
      rootReducer,
      {} as ArchitectUIState,
      [],
      [devTool.isEnabled() ? devTool.enhancer() : f => f]
    );

  }
}
