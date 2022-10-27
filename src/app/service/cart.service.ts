import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

   selectedProduct: Subject<Product> = new Subject();
   cartSize: Subject<number> = new Subject();
   totalPrice: Subject<number> = new Subject();
   
  constructor() { }


  addSelectedProduct(product: Product){

    this.selectedProduct.next(product);

  }

  changeCartSize(numberOfProdsInCart: number){
     
    this.cartSize.next(numberOfProdsInCart);
  }


  changeTotalPrice(totalPrice:number){
    this.totalPrice.next(totalPrice);
  }
}
