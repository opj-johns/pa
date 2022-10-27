import { AfterViewInit, Component, OnInit } from "@angular/core";
import { CartTableData } from "src/app/model/cartTableData";
import { Product } from "src/app/model/product";
import { CartService } from "src/app/service/cart.service";
import { ProductService } from "src/app/service/product.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit{

  products!: Product[];
  numberOfProdsInCart = 0;
  prodsInStock = 0;
  totalCartPrice = 0;
  
  constructor( private cartService: CartService) {
    
   }

  ngOnInit(): void {
    this.listenToCartItemsNumberChange();
    this.listenToTotalCartPriceChange();
  }



  listenToCartItemsNumberChange(){
    this.cartService.cartSize.subscribe({
      next:(data)=>{
        console.log('good data')
        this.numberOfProdsInCart = data; 
      },
      error: (error)=>{
        console.log('error listening to cart product number changes', error);
      }
    })
  }

  listenToTotalCartPriceChange(){
    this.cartService.totalPrice.subscribe({
      next:(data)=>{
        console.log('good data')
        this.totalCartPrice = data; 
      },
      error: (error)=>{
        console.log('error listening to cart total price changes', error);
      }
    })
  }

  getProductQuantity(prodsQty: number){
     this.prodsInStock = prodsQty;
  }






}



