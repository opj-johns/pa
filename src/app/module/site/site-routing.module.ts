import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeViewComponent } from "./components/home-view/home-view.component";
import { HomeComponent } from "./components/home/home.component";

const routes: Routes=[
    {path:'', component: HomeComponent , children:[
       {path: '', component: HomeViewComponent}
        
    ]}
]

@NgModule({
    imports:[RouterModule.forChild(routes),],
    exports:[RouterModule]
})
export class SiteRoutingModule{

}