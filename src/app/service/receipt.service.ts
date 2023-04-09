import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Receipt } from '../model/receipt';
import { ShopOrder } from '../model/shop-order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {
  url = environment.baseUrl+"/api/receipt";
  constructor(private httpClient: HttpClient) { }

  
  save(order:ShopOrder):Observable<Receipt>{
    
    
    let receipt = new Receipt()
    receipt.shopOrder = order;
    receipt.date= new Date();
    console.log("saving receipt...",receipt);
    
    return  this.httpClient.post<Receipt>(`${this.url}/save`, receipt)
  }


  getReceipt(orderId:number):Observable<Receipt>{
     let order = new ShopOrder();
     order.id =orderId;
    return this.httpClient.post<Receipt>(`${this.url}/fetch-by-order`, order);
  }
}
