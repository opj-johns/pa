import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Command } from '../model/command';
import { ShopOrder } from '../model/shop-order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = "http://localhost:8080/api/order"
  

  constructor(private httpClient: HttpClient) { }

 

  fetchCommands():Observable<Command[]>{
   return this.httpClient.get<Command[]>(`${this.baseUrl}/commands`);
  }


  getOrder(orderId: number):Observable<ShopOrder>{
    return this.httpClient.get<ShopOrder>(`${this.baseUrl}/${orderId}`);
  }

  deleteOrder(orderId:number):Observable<void>{

     let order = new ShopOrder();
     order.id = orderId;

    return this.httpClient.post<void>(`${this.baseUrl}/delete`, order);
  }


}
