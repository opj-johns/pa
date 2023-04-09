import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../model/category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = environment.baseUrl+"/api/categories";

  constructor(private httpClient: HttpClient) { }

    // fetch all suppliers
    fetchAll():Observable<Category[]>{
      return this.httpClient.get<Category[]>(`${this.url}/all`)
    }
    
}
