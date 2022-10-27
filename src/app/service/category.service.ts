import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl = "http://localhost:8080/api/categories";

  constructor(private httpClient: HttpClient) { }

    // fetch all suppliers
    fetchAll():Observable<Category[]>{
      return this.httpClient.get<Category[]>(`${this.baseUrl}/all`)
    }
    
}
