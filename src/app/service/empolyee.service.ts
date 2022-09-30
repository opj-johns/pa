import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Employee } from '../model/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpolyeeService {

 baseUrl = "http://localhost:8080/api/employee"

  constructor(private httpClient: HttpClient) { }
  

  // create a mothod to call the backend using http

  fetchEmployees(): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.baseUrl}/all`);
  }

}
