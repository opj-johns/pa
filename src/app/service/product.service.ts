import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = environment.baseUrl+"/api/product";

  constructor(private httpClient: HttpClient) { }
  
  fetchProducts():Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.url}/all`);
  }

  fetchProduct(id:number):Observable<Product>{
    return this.httpClient.get<Product>(`${this.url}/${id}`);
  }

  saveProduct(product:Product):Observable<Product>{
    product.imageUrl=environment.baseUrl+'/api/image/fileSystem/get/'+product.imageUrl;
    return this.httpClient.post<Product>(`${this.url}/save`, product);
  }

  updateProduct(product:Product):Observable<Product>{
    product.imageUrl=environment.baseUrl+'/api/image/fileSystem/get/'+product.imageUrl;
    return this.httpClient.put<Product>(`${this.url}/save`,  product);
  }

  deleteProduct(product:Product):Observable<void>{
    return this.httpClient.post<void>(`${this.url}/delete`, product);
  }

  

  getImage(imageName:string):Observable<any>{
   return  this.httpClient.get<any>(`${this.url}/image/fileSystem/` + imageName);
  }

  
}
