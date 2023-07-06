import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Purchase } from '../model/purchase';
import { PurchaseReceipt } from '../model/purchase-receipt';

@Injectable({
  providedIn: 'root'
})
export class PurchaseReceiptService {
  url = environment.baseUrl+"/api/purchase-receipt";
  constructor(private httpClient: HttpClient) { }

  
  save(purchase:Purchase):Observable<PurchaseReceipt>{
    let receipt = new PurchaseReceipt()
    receipt.purchase = purchase;
    receipt.date= new Date();
    console.log("saving receipt...",receipt);
    
    return  this.httpClient.post<PurchaseReceipt>(`${this.url}/save`, receipt)
  }

  getReceipt(purchaseId:number):Observable<PurchaseReceipt>{
     let purchase = new Purchase();
     purchase.id =purchaseId;
    return this.httpClient.post<PurchaseReceipt>(`${this.url}/fetch-by-purchase`, purchase);
  }
}
