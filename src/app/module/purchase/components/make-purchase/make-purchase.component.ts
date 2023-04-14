import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Purchase, PurchaseWrapper } from 'src/app/model/purchase';
import { PurchaseDetail } from 'src/app/model/purchase-detail';
import { Supplier } from 'src/app/model/supplier';
import { PurchaseDetailService } from 'src/app/service/purchase-detail.service';
import { PurchaseInteractionService } from 'src/app/service/purchase-interaction.service';
import { PurchaseService } from 'src/app/service/purchase.service';
import { SupplierService } from 'src/app/service/supplier.service';

@Component({
  selector: 'app-make-purchase',
  templateUrl: './make-purchase.component.html',
  styleUrls: ['./make-purchase.component.scss']
})
export class MakePurchaseComponent implements OnInit {

  purchaseDate!: Date;
  purchaseDetails!:PurchaseDetail[];
  supplier!: Supplier;
  purchaseDetailsSize:number = 0
  supplierName:string="";
  purchaseId!:number;

  constructor(private purchaseInteractionService: PurchaseInteractionService,
              private purchaseService: PurchaseService, 
              private purchaseDetailService: PurchaseDetailService,
              private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    let paramValue = this.activatedRoute.snapshot.paramMap.get("id");
    if(paramValue!==null) {
      this.purchaseId = Number(paramValue);
      this.getSupplierFromPurchase();
      console.log("I get an id",this.purchaseId);
    }else{
      this.listenToSelectedSupplier();
    }
    // research field, while does purchaseId receive zero 0 when there is not route parameter set
    this.listentToDateChanges();
    this.listenToPurchaseDetails();
  }

  getSupplierFromPurchase(){
    this.purchaseService.fetchSupplier(this.purchaseId).subscribe({
      next:(data)=>{
         this.supplierName = data.name;
         this.supplier = data;
         console.log("retreived supplier", this.supplier);
      },
      error:(err)=>{
        console.log("error fetching supplier", err);
      }
    })
  }


  listenToSelectedSupplier(){
    this.purchaseInteractionService.selectedSupplierSubject.subscribe({
      next:(supplier)=>{
        this.supplier = supplier;
        console.log("Supplier selected:", supplier.name);
      }
    })
  }

  listentToDateChanges(){
     this.purchaseInteractionService.purchaseDateSubject.subscribe({
      next:(date)=>{
        this.purchaseDate = date;
        console.log("Date selected", date);
      }
     })
  }

  listenToPurchaseDetails(){
    this.purchaseInteractionService.purchaseDetailsSubject.subscribe({
      next:(details)=>{
        this.purchaseDetails = details;
        this.purchaseDetailsSize = this.purchaseDetails.length;
        console.log("Purchase details state in make purchase component", this.purchaseDetails);
      }
    })
  }

  onPurchase(){
     let purchase = new Purchase();
     purchase.date = this.purchaseDate;
     purchase.supplier = this.supplier;
     
     let purchaseWrapper: PurchaseWrapper = {
          purchase: purchase,
          purchaseDetails: this.purchaseDetails
     }

     

     this.purchaseService.saveNewPurchase(purchaseWrapper).subscribe({
      next:(purchase)=>{
        alert("Achat est sauvegardé!!");
        console.log("saved purchase", purchase);
        
        this.purchaseInteractionService  
              .resetPurchaseCartProductTable();
      },
      error:(err)=>{
        console.log("error saving purchase",err);
      }
     })

  }

  onUpdatePurchase(){
    this.purchaseDetailService.updatePurchaseDetail(this.purchaseId, this.purchaseDetails).subscribe({
      next:(data)=>{
        alert("L'achat est modifié");
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}
