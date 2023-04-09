import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Employee } from '../model/employee';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

 url = environment.baseUrl+"/api/employee"

  constructor(private httpClient: HttpClient) { }
  

  // create a mothod to call the backend using http
  fetchEmployees(): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.url}/all`);
  }

  // get one employee
  fetchEmployee(id:number): Observable<Employee>{
    console.log(id);
    return this.httpClient.get<Employee>(`${this.url}/${id}`);
  }

  // save one employee
  saveEmployee(employee: Employee):Observable<Employee>{
    return this.httpClient.post<Employee>(`${this.url}/save`, employee)
  }

  // update employee
  updateEmployee(employee:Employee):Observable<Employee>{
    return this.httpClient.post<Employee>(`${this.url}/save`, employee)
  }

  // delete employee
  deleteEmployee(employee:Employee):Observable<void>{
    return this.httpClient.post<void>(`${this.url}/delete`, employee);
  }

}
