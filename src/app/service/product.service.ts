import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductWrapper } from '../model/data_models/product_wrapper';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:8080/api/product"

  constructor(private httpClient: HttpClient) { }
  
  fetchProducts():Observable<ProductWrapper[]>{
    return this.httpClient.get<ProductWrapper[]>(`${this.baseUrl}/all`);
  }

  fetchProduct(id:number):Observable<Product>{
    return this.httpClient.get<Product>(`${this.baseUrl}/${id}`);
  }

  saveProduct(product:Product):Observable<Product>{
    return this.httpClient.post<Product>(`${this.baseUrl}/save`, product);
  }

  updateProduct(product:Product):Observable<Product>{
    return this.httpClient.put<Product>(`${this.baseUrl}/save`,  product);
  }

  deleteProduct(product:Product):Observable<void>{
    return this.httpClient.post<void>(`{this.baseUrl}/delete`, product);
  }

  

  getImage(imageName:string):Observable<any>{
   return  this.httpClient.get<any>('http://localhost:8080/image/fileSystem/' + imageName);
  }

  
}
