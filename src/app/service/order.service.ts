import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Command } from '../model/command';
import { ShopOrder } from '../model/shop-order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url = environment.baseUrl+"/api/order";
  

  constructor(private httpClient: HttpClient) { }

 

  fetchCommands():Observable<Command[]>{
   return this.httpClient.get<Command[]>(`${this.url}/commands`);
  }


  getOrder(orderId: number):Observable<ShopOrder>{
    return this.httpClient.get<ShopOrder>(`${this.url}/${orderId}`);
  }

  deleteOrder(orderId:number):Observable<void>{

     let order = new ShopOrder();
     order.id = orderId;

    return this.httpClient.post<void>(`${this.url}/delete`, order);
  }


}
