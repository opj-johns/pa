import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetail } from '../model/order-detail';
import { Purchase, PurchaseWrapper } from '../model/purchase';
import { PurchaseDetail } from '../model/purchase-detail';
import { PurchaseTableData } from '../model/purchase-table-data';
import { Supplier } from '../model/supplier';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  url = environment.baseUrl+"/api/purchase"
  constructor(private httpClient: HttpClient) { }

  saveNewPurchase(purchaseWrapper: PurchaseWrapper):Observable<Purchase>{
   return this.httpClient.post<Purchase>(`${this.url}/save`, purchaseWrapper);
  }


  fetchPurchaseData():Observable<PurchaseTableData[]>{
    return this.httpClient.get<PurchaseTableData[]>(`${this.url}/data`);
  }


  delete(purchaseId:number):Observable<void>{

    let purchase = new Purchase();
    purchase.id = purchaseId;

   return this.httpClient.post<void>(`${this.url}/delete`, purchase);
 }


 fetchSupplier(purchaseId:number):Observable<Supplier>{
    let purchase = new Purchase();
    purchase.id = purchaseId;
    return this.httpClient.post<Supplier>(`${this.url}/get-supplier`, purchase);
  }


  getPurchase(pucrhaseId: number):Observable<Purchase>{
    return this.httpClient.get<Purchase>(`${this.url}/${pucrhaseId}`);
  }
 

}
