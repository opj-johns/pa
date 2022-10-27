import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Employee } from '../model/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

 baseUrl = "http://localhost:8080/api/employee"

  constructor(private httpClient: HttpClient) { }
  

  // create a mothod to call the backend using http
  fetchEmployees(): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.baseUrl}/all`);
  }

  // get one employee
  fetchEmployee(id:number): Observable<Employee>{
    console.log(id);
    return this.httpClient.get<Employee>(`${this.baseUrl}/${id}`);
  }

  // save one employee
  saveEmployee(employee: Employee):Observable<Employee>{
    return this.httpClient.post<Employee>(`${this.baseUrl}/save`, employee)
  }

  // update employee
  updateEmployee(employee:Employee):Observable<Employee>{
    return this.httpClient.post<Employee>(`${this.baseUrl}/save`, employee)
  }

  // delete employee
  deleteEmployee(employee:Employee):Observable<void>{
    return this.httpClient.post<void>(`${this.baseUrl}/delete`, employee);
  }

}
