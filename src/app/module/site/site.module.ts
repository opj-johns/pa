import { NgModule } from '@angular/core';
import { HeaderComponent } from 'src/app/component/site/header/header.component';
import { FooterComponent } from 'src/app/component/site/footer/footer.component';
import { BaseModule } from 'src/app/shared/base/base.module';
import { SiteRoutingModule } from './site-routing.module';
import { HomeComponent } from 'src/app/component/site/home/home.component';
import { HomeViewComponent } from 'src/app/component/site/home-view/home-view.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    HomeViewComponent
  ],
  imports: [  
    SiteRoutingModule,
    BaseModule
  ]
})
export class SiteModule { }
