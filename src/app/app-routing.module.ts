import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './module/auth/components/login/login.component';

const routes: Routes = [
  {path:'site', loadChildren: ()=> import('./module/site/site.module').then(m=>m.SiteModule) },
  {path:'admin', loadChildren:()=> import('./module/admin/admin.module').then(m=>m.AdminModule)},
  {path:'login', component:LoginComponent},
  {path:'**', redirectTo: 'site'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
