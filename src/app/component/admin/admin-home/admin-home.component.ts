import {  Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit{
  
  showSidebar: boolean = true;
  username: string = ``;
   previewMenu!: HTMLElement;
   @ViewChild("id1") dashboard!:ElementRef;


  constructor(private router: Router, 
    private authService:AuthService) { }


  ngOnInit(): void {
    const possibleUsername =  localStorage.getItem('username');
    if(possibleUsername!==null) {
      this.username = possibleUsername;
      return;
    }
    this.router.navigateByUrl(`/login`)
  }

 


  closeSidebar(){
    this.showSidebar = !this.showSidebar;
  }

  onMenuClick(menuId: HTMLElement, menuIconId: HTMLElement){

    if(this.previewMenu===undefined){
     this.dashboard.nativeElement.style.cssText = "color: #A23131;"
    }else{
      this.previewMenu.style.cssText = "color:#A23131;"
    }

    this.previewMenu = menuId;

     menuId.style.cssText = "color: green";
     console.log(menuId.style.cssText);
  }

  signout(){
    this.authService.signoutUser();
    this.router.navigateByUrl(`/site`);
  }
}
