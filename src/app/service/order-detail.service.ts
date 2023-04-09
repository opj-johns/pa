import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartTableData } from '../model/cartTableData';
import { Client } from '../model/client';
import { DialogProduct } from '../model/dialog-product';
import { Employee } from '../model/employee';
import { OrderDetail } from '../model/order-detail';
import { Product } from '../model/product';
import { ShopOrder } from '../model/shop-order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  
  url = environment.baseUrl+"/api/order-detail";

  constructor(private httpClient: HttpClient) { }

  fetchDialogProducts(orderId:number):Observable<DialogProduct[]>{
    let order : ShopOrder = new ShopOrder();
    order.id = orderId;
    return this.httpClient.post<DialogProduct[]>(`${this.url}/dialog-products`, order );
  }

  updateDetails(orderId:number, cartProducts:CartTableData[]):Observable<OrderDetail[]>{
    let orderDetails: OrderDetail[]=[] ;

    cartProducts.forEach(cartProduct=>{
      let orderDetail = new OrderDetail();
      orderDetail.quantity = cartProduct.qty;

      let order = new ShopOrder();
      order.id = orderId;
      orderDetail.shopOrder = order;
      
      let product = new Product();
      product.id = cartProduct.id;
      orderDetail.product = product;

      orderDetails.push(orderDetail);
    })

    return  this,this.httpClient.post<OrderDetail[]>(`${this.url}/update`,orderDetails);
  }

  save(employeeId: number, 
    clientId: number, 
    cartProducts: CartTableData[]): Observable<OrderDetail[]>{


 // create shopOrder class
 let shopOrder = new ShopOrder();

 // add employee
 let employee = new Employee();
 employee.id = employeeId;
 shopOrder.employee = employee;

 // add client
 let client = new Client();
 client.id = clientId;
 shopOrder.client = client;

 // at this stage, the of the purchase is at id  2
 shopOrder.orderStatus = {
   id: 2,
   status:""
 }
 
 // create orderDetail 
 let orderDetails: OrderDetail[] = [];

 cartProducts.forEach(cartProduct=>{
   
   let product = new Product();
   product.id = cartProduct.id;

   let orderDetail = new OrderDetail();
   orderDetail.quantity = cartProduct.qty;
   orderDetail.product = product;
   orderDetail.shopOrder = shopOrder;


   orderDetails.push(orderDetail);

 })


 return this.httpClient.post<OrderDetail[]>(`${this.url}/save`, orderDetails);
 

}

  getAllByOrder(orderId:number):Observable<OrderDetail[]>{
    let order = new ShopOrder();
    order.id = orderId;

    return this.httpClient.post<OrderDetail[]>(`${this.url}/by-order`, order);
  }  


}
