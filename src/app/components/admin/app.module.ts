import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { NgxBootstrapConfirmModule } from 'ngx-bootstrap-confirm';
import { environment } from 'src/environments/environment';
// #fake-start#
import { AdminRoutingModule } from './app-routing.module';
import { IndexComponent } from './index/index.component';
import { ToastrModule } from 'ngx-toastr';
// #fake-end#

/*
function appInitializer(authService: AuthService) {
  return () => {
    return new Promise((resolve) => {
      authService.getUserByToken().subscribe().add(resolve);
    });
  };
} */



@NgModule({
  declarations: [IndexComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    ClipboardModule,
    // #fake-start#

    // #fake-end#
    AdminRoutingModule,
    InlineSVGModule.forRoot(),
    ToastrModule.forRoot(), // ToastrModule added
    NgxBootstrapConfirmModule,

    NgbModule,

  ],
  providers: [
/*
        {
      provide: APP_INITIALIZER,
      useFactory: ,
      multi: true,
      deps: [AuthService],
    }*/
  ],
  bootstrap: [AppComponent],
})
export class AdminModule {}
