import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../model/payment';
import { PaymentDialogData } from '../model/payment-dialog-data';
import { PaymentType } from '../model/payment-type';
import { ShopOrder } from '../model/shop-order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  url = environment.baseUrl+"/api/payment"

  constructor(private httpClient: HttpClient) { }

  fetchDialogPaymentData(orderId:number):Observable<PaymentDialogData[]>{
    let order = new ShopOrder();
    order.id = orderId;
    
    return this.httpClient.post<PaymentDialogData[]>(`${this.url}/payment-dialogs`, order);
    
  }

  fetchPaymentTypes():Observable<PaymentType[]>{
     return this.httpClient.get<PaymentType[]>(`${this.url}/types`);
  }

  makePayment(amountPaid:number, paymentTypeId:number, orderId:number):Observable<Payment>{

    let paymentType = new PaymentType();
    paymentType.id = paymentTypeId;

    let order = new ShopOrder();
    order.id = orderId;

    let payment = new Payment();
    payment.amountPaid = amountPaid;
    payment.shopOrder = order;
    payment.paymentType = paymentType;

    return this.httpClient.post<Payment>(`${this.url}/save`, payment);

  }

}
