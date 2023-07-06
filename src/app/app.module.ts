import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BaseModule } from './shared/base/base.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
      ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BaseModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
