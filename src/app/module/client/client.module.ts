import { NgModule } from '@angular/core';

import { ClientRoutingModule } from './client-routing.module';
import { BaseModule } from 'src/app/shared/base/base.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { ClientComponent } from 'src/app/module/client/components/client/client.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ClientTableComponent } from './components/client-table/client-table.component';
  

@NgModule({
  declarations: [
     ClientComponent, // client module
     ClientTableComponent,
     ClientFormComponent,
  ],
  imports: [
    ClientRoutingModule,
    BaseModule,
    AngularMaterialModule,
  ]
})
export class ClientModule { }
