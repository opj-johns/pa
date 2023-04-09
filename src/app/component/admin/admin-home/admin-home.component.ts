import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit{
  
  showSidebar: boolean = true;

   previewMenu!: HTMLElement;
   @ViewChild("id1") dashboard!:ElementRef;

  constructor() { }


  ngOnInit(): void {

  }

 


  closeSidebar(){
    this.showSidebar = !this.showSidebar;
  }

  onMenuClick(menuId: HTMLElement){

    if(this.previewMenu===undefined){
     this.dashboard.nativeElement.style.cssText = "color: white;"
    }else{
      this.previewMenu.style.cssText = "color:white;"
    }

    this.previewMenu = menuId;

     menuId.style.cssText = "color: green";
     console.log(menuId.style.cssText);
  }
  
}
