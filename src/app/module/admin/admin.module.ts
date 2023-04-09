import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './../../component/admin/dashboard/dashboard.component';
import { BaseModule } from 'src/app/shared/base/base.module';
import { AdminHomeComponent } from 'src/app/component/admin/admin-home/admin-home.component';
import { ChartsModule } from 'src/app/shared/charts/charts.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { SettingsComponent } from 'src/app/component/admin/settings/settings.component';
import { LoginComponent } from 'src/app/component/app/login/login.component';


@NgModule({
  declarations: [
    DashboardComponent, // dashboard module
    AdminHomeComponent, // admin module
    SettingsComponent, // settings module
    LoginComponent
  ],
  imports: [
    AdminRoutingModule,
    BaseModule,
    ChartsModule,
    AngularMaterialModule,
    ChartsModule
  ]
})
export class AdminModule { }
