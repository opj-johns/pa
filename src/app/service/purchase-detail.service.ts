import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogProduct } from '../model/dialog-product';
import { Purchase } from '../model/purchase';
import { PurchaseDetail } from '../model/purchase-detail';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseDetailService {
  url = environment.baseUrl+"/api/purchase-detail";

  constructor(private httpClient: HttpClient) { }

  fetchDialogProducts(purchaseId:number):Observable<DialogProduct[]>{
    let purchase : Purchase = new Purchase();
        purchase.id = purchaseId;
    return this.httpClient.post<DialogProduct[]>(`${this.url}/dialog-products`, purchase );
  }

  

  updatePurchaseDetail(purchaseId:number, 
                       purchaseDetails: PurchaseDetail[]):Observable<PurchaseDetail[]>{
    let purchase  = new Purchase();
    purchase.id = purchaseId;
     
    for(let i=0; i<purchaseDetails.length; i++){
       purchaseDetails[i].purchase = purchase;
    }

     return this.httpClient.post<PurchaseDetail[]>(`${this.url}/update`, purchaseDetails);
  }  

}
