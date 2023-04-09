import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetail } from '../model/order-detail';
import { Purchase, PurchaseWrapper } from '../model/purchase';
import { PurchaseDetail } from '../model/purchase-detail';
import { PurchaseTableData } from '../model/purchase-table-data';
import { Supplier } from '../model/supplier';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  baseUrl = "http://localhost:8080/api/purchase"
  constructor(private httpClient: HttpClient) { }

  saveNewPurchase(purchaseWrapper: PurchaseWrapper):Observable<Purchase>{
   return this.httpClient.post<Purchase>(`${this.baseUrl}/save`, purchaseWrapper);
  }


  fetchPurchaseData():Observable<PurchaseTableData[]>{
    return this.httpClient.get<PurchaseTableData[]>(`${this.baseUrl}/data`);
  }


  delete(purchaseId:number):Observable<void>{

    let purchase = new Purchase();
    purchase.id = purchaseId;

   return this.httpClient.post<void>(`${this.baseUrl}/delete`, purchase);
 }


 fetchSupplier(purchaseId:number):Observable<Supplier>{
    let purchase = new Purchase();
    purchase.id = purchaseId;
    return this.httpClient.post<Supplier>(`${this.baseUrl}/get-supplier`, purchase);
  }
 

}
