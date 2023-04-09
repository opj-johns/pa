import { NgModule } from '@angular/core';
import { BaseModule } from 'src/app/shared/base/base.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeViewComponent } from './components/home-view/home-view.component';
import { HomeComponent } from './components/home/home.component';
import { SiteRoutingModule } from './site-routing.module';



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
