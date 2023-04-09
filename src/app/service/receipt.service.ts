import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Receipt } from '../model/receipt';
import { ShopOrder } from '../model/shop-order';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {
  baseUrl = "http://localhost:8080/api/receipt"
  constructor(private httpClient: HttpClient) { }

  
  save(order:ShopOrder):Observable<Receipt>{
    
    
    let receipt = new Receipt()
    receipt.shopOrder = order;
    receipt.date= new Date();
    console.log("saving receipt...",receipt);
    
    return  this.httpClient.post<Receipt>(`${this.baseUrl}/save`, receipt)
  }


  getReceipt(orderId:number):Observable<Receipt>{
     let order = new ShopOrder();
     order.id =orderId;
    return this.httpClient.post<Receipt>(`${this.baseUrl}/fetch-by-order`, order);
  }
}
