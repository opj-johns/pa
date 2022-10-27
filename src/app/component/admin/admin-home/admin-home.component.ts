import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  
  showSidebar: boolean = true;

  constructor() { }


  ngOnInit(): void {
  }


  closeSidebar(){
    this.showSidebar = !this.showSidebar;
  }
  
}
