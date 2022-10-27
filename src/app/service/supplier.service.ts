import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from '../model/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  baseUrl = "http://localhost:8080/api/supplier"

  constructor(private httpClient: HttpClient) { }


  // fetch all suppliers
  fetchAll():Observable<Supplier[]>{
    return this.httpClient.get<Supplier[]>(`${this.baseUrl}/all`)
  }

  // fetch one supplier by id

  fetchSupplier(id:number):Observable<Supplier>{
    return this.httpClient.get<Supplier>(`${this.baseUrl}/${id}`);
  }

  // save new supplier 
  saveSupplier(supplier:Supplier):Observable<Supplier>{
    let newSupplier = new Supplier();
    newSupplier.name = supplier.name;
    newSupplier.address = supplier.address;
    newSupplier.tel = supplier.tel;
    newSupplier.email = supplier.email;
    return this.httpClient.post<Supplier>(`${this.baseUrl}/save`, supplier);
  }

  // update supplier 
  updateSupplier(supplier:Supplier):Observable<Supplier>{
    
    return this.httpClient.post<Supplier>(`${this.baseUrl}/save`, supplier);
  }

  // delete supplier
  deleteSupplier(supplier:Supplier):Observable<void>{
    return this.httpClient.post<void>(`${this.baseUrl}/delete`, supplier)
  }

}
