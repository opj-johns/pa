import { Component, OnInit } from '@angular/core';
import { Employee } from '../../model/employee';
import { EmpolyeeService } from '../../service/empolyee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  // store response
  employees!: Employee[];

  // doing DI and creating employeeService local instance
  constructor(private employeeService: EmpolyeeService) { }

  ngOnInit(): void {
    this.getEmployees();
    
  }


  getEmployees(){
       this.employeeService.fetchEmployees().subscribe({
        next: (employees)=>{
              this.employees = employees
              console.log(`Fetched employees: `,this.employees);
        },
        error: (error)=>{
             console.log("Error fetching employees", error);
        }
       }) 
  }


}
