import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentDialogData } from '../model/payment-dialog-data';
import { PaymentType } from '../model/payment-type';
import { Purchase } from '../model/purchase';
import { PurchasePayment } from '../model/purchase-payment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchasePaymentService {
  url = environment.baseUrl+"/api/purchase-payment"

  constructor(private httpClient: HttpClient) { }

  fetchDialogPaymentData(purchaseId:number):Observable<PaymentDialogData[]>{
    let purchase = new Purchase();
    purchase.id = purchaseId;
    
    return this.httpClient.post<PaymentDialogData[]>(`${this.url}/dialog-data`, purchase);
    
  }

  makePayment(amountPaid:number, paymentTypeId:number, purchaseId:number):Observable<PurchasePayment>{

    let paymentType = new PaymentType();
    paymentType.id = paymentTypeId;

    let purchase = new Purchase();
    purchase.id = purchaseId;

    let payment = new PurchasePayment();
    payment.amount = amountPaid;
    payment.purchase = purchase;
    payment.paymentType = paymentType;

    return this.httpClient.post<PurchasePayment>(`${this.url}/save`, payment);

  }

  fetchPaymentTypes():Observable<PaymentType[]>{
    return this.httpClient.get<PaymentType[]>(`${this.url}/types`);
 }

  

}
