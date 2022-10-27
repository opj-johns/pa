import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/app/login/login.component';

import { BaseModule } from './shared/base/base.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SupplierFormComponent } from './component/admin/supplier-form/supplier-form.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SupplierFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BaseModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
