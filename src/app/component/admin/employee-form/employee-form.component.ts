import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/empolyee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

  employeeForm!: FormGroup;
  employeeId: number = 0;
  employee!: Employee;

  constructor(private employeeService: EmployeeService, private activatedRoute: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.employeeId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.createEmployeeForm();
    if(this.employeeId!==0){
      this.getEmployee();
    }
  }

  createEmployeeForm(){
    this.employeeForm = new FormGroup({
      id: new FormControl(''),
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
      salary: new FormControl('', [Validators.required])
    })
  }


  getEmployee(){
    console.log(`EmplId: ${this.employeeId}`)
    this.employeeService.fetchEmployee(this.employeeId).subscribe({
      next:(data)=>{
        this.employee = data;
        this.fillForm()
        console.log(data);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  fillForm(){
     this.employeeForm.controls['id'].setValue(this.employee.id);
     this.employeeForm.controls['firstName'].setValue(this.employee.firstName);
     this.employeeForm.controls['lastName'].setValue(this.employee.lastName);
     this.employeeForm.controls['email'].setValue(this.employee.email);
     this.employeeForm.controls['phone'].setValue(this.employee.phone);
     this.employeeForm.controls['salary'].setValue(this.employee.salary);
  }


  cancel(){
     this.router.navigateByUrl(`/admin/employee`);
  }

  onSubmit(){
    if(this.employeeId === 0){
      this.employeeService.saveEmployee(this.employeeForm.value).subscribe({
        next:(data)=>{
          alert(`L'employee ${data.lastName} ${data.firstName} est sauvegardé.`);
          this.cancel();
        },
        error:(err)=>{console.log( `Error saving employee`, err)}
      })
      return;
    }

    this.employeeService.updateEmployee(this.employeeForm.value).subscribe({
      next:(data)=>{
        alert(`L'employee ${data.lastName} ${data.firstName} est mis à jour.`);
        this.cancel();
      },
      error:(err)=>{console.log(`Error saving employee`, err)}
    })
  }



}
