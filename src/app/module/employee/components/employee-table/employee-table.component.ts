import { Component,ViewChild, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/empolyee.service';


@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss']
})
export class EmployeeTableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [ 'firstName', 'lastName', 'email', 'phone', 'salary','actions'];
  dataSource!: MatTableDataSource<Employee>;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  employees!: Employee[];

  constructor(private employeeService:EmployeeService, private router:Router) {} 

  ngOnInit(): void {
    this.getAllEmployees();
  }


  ngAfterViewInit(): void {}


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  } 

  getAllEmployees(){
      this.employeeService.fetchEmployees().subscribe({
        next: (data)=>{
          this.employees = data;
          console.log(`fetched employees successfully`, this.employees);
          // -------------------------------------
          // Assign the data to the data source for the table to render
           this.dataSource = new MatTableDataSource(this.employees);

          // -------------------------------------
          if(this.dataSource !== undefined && this.paginator !== undefined ){

            this.dataSource.paginator = this.paginator;
            
          }else{ console.log('undefined datasource') }
          if(this.dataSource.sort !== undefined && this.sort !== undefined){
            this.dataSource.sort = this.sort;
      
          }else{ console.log('undefined datasource') }
        },
        error:(err)=>{
          console.log(`Error fetching employees`);
        }
      })
  }

  deleteEmployee(employee: Employee){
    if(confirm(`Voulez-vous supprimer ${employee.lastName}?`)){
      this.employeeService.deleteEmployee(employee).subscribe({
        next: (data)=>{alert('Employee est supprimé')},
        error:(err)=>{console.log(err)}
      })
    }
  }

  openFormPage(emplId:number){
    this.router.navigateByUrl(`/admin/employee/form/${emplId}`);
  }
  
}

