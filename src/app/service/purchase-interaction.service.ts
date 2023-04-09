import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../model/product';
import { Detail, PurchaseDetail } from '../model/purchase-detail';
import { Supplier } from '../model/supplier';

@Injectable({
  providedIn: 'root'
})
export class PurchaseInteractionService {

  //  private purchaseDetail:
   private purchaseDetails: PurchaseDetail[] = [];
   private purchaseDate!: Date ;
   private totalPurchaseAmount: number =0;
   private totalQuantity: number = 0;
   private selectedSupplier!:Supplier;

   purchaseDetailsSubject: Subject<PurchaseDetail[]> = new Subject();
   purchaseDateSubject: Subject<Date> = new Subject();
   totalPurchaseAmountSubject: Subject<number> = new Subject();
   totalQuantitySubject: Subject<number> = new Subject();
   selectedSupplierSubject:Subject<Supplier> = new Subject();
   newProductSubject: Subject<Product> = new Subject();
   enableProductPurchaseSubject: Subject<number> = new Subject();
   emptyProductTableSubject: Subject<Product[]> = new Subject();

  constructor() { }


  addNewPurchaseDetail(purchaseDetail: PurchaseDetail){
    this.purchaseDetails.push(purchaseDetail);

    this.totalPurchaseAmount += purchaseDetail.purchasePrice * purchaseDetail.quantity;
    this.totalQuantity += purchaseDetail.quantity;

    this.totalPurchaseAmountSubject.next(this.totalPurchaseAmount);
    this.totalQuantitySubject.next(this.totalQuantity);
    this.purchaseDetailsSubject.next(this.purchaseDetails);
    this.newProductSubject.next(purchaseDetail.product);
    
  }

  editPurchaseDetail(productId:number, detail:Detail){
      let index = this.purchaseDetails.findIndex(purchaseDetail=> purchaseDetail.product.id === productId);
      
      if(index>-1){
        
        this.totalPurchaseAmount -= this.purchaseDetails[index].purchasePrice * this.purchaseDetails[index].quantity;
        this.totalQuantity -= this.purchaseDetails[index].quantity;

        this.purchaseDetails[index].product.price = detail.sellingPrice;
        
        this.purchaseDetails[index].purchasePrice = detail.purchasePrice;
        this.purchaseDetails[index].sellingPrice = detail.sellingPrice;


        this.totalPurchaseAmount += detail.purchasePrice * detail.quantity;
        this.totalQuantity += detail.quantity;

        this.purchaseDetailsSubject.next(this.purchaseDetails);
        this.totalPurchaseAmountSubject.next(this.totalPurchaseAmount);
        this.totalQuantitySubject.next(this.totalQuantity);


      }
  }


  deletePurchaseDetail(productId: number){
    
    let index = this.purchaseDetails.findIndex(purchaseDetail=> purchaseDetail.product.id === productId);

    if(index >-1){
     let deletedPurchaseDetails: PurchaseDetail[] = this.purchaseDetails.splice(index, 1);

     this.totalPurchaseAmount -= deletedPurchaseDetails[0].purchasePrice * deletedPurchaseDetails[0].quantity;
     this.totalQuantity -= deletedPurchaseDetails[0].quantity;

     this.purchaseDetailsSubject.next(this.purchaseDetails);
     this.totalPurchaseAmountSubject.next(this.totalPurchaseAmount);
     this.totalQuantitySubject.next(this.totalQuantity);
    }else{
      alert("Purchase detail not found for this product");
    }


  }

  getDetail(productId:number):Detail{
    let detail:Detail = new Detail;
    let purchaseDetail = this.purchaseDetails.find(p=> p.product.id === productId);

    if(purchaseDetail!==undefined){
      detail.purchasePrice = purchaseDetail.purchasePrice;
      detail.sellingPrice = purchaseDetail.sellingPrice;
      detail.quantity = purchaseDetail.quantity;
    }
    return detail;

  }
  

  updatePurchaseDate(date: Date){
   this.purchaseDate = date;
   this.purchaseDateSubject.next(this.purchaseDate);
  }

  updateSelectedSupplier(supplier : Supplier){
      this.selectedSupplier = supplier;
      this.selectedSupplierSubject.next(this.selectedSupplier);
  }

  enableProductPurchase(productId: number){
      this.enableProductPurchaseSubject.next(productId);
  }

  resetPurchaseCartProductTable(){
    
    this.emptyProductTableSubject.next([]);
  }

}
