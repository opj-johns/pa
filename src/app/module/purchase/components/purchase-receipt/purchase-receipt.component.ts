import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxCaptureService } from 'ngx-capture';
import { tap } from 'rxjs';
import { Purchase } from 'src/app/model/purchase';
import { PurchaseReceiptService } from 'src/app/service/purchase-receipt.service';
import { PurchaseService } from 'src/app/service/purchase.service';

@Component({
  selector: 'app-purchase-receipt',
  templateUrl: './purchase-receipt.component.html',
  styleUrls: ['./purchase-receipt.component.scss']
})
export class PurchaseReceiptComponent implements OnInit {

  purchaseId!:number;
  stringDate!: string; 
  purchase!:Purchase;
  supplierName:string = "";

  ttc: number = 0;
  amountPaid:number=0;
  disableValidate: boolean = true;
  disablePrintBtn: boolean = true;
  disableDownloadBtn:boolean = true;

  @ViewChild("confirm") confirm!: ElementRef;
  @ViewChild('receipt', { static: true }) receipt: any;

  isSaved: boolean = false;
  constructor(private activatedRoute: ActivatedRoute,
    private purchaseService:PurchaseService, 
    private purchaseReceiptService: PurchaseReceiptService,
    private captureService: NgxCaptureService) { }

  ngOnInit(): void {
    let id = Number(this.activatedRoute.snapshot.paramMap.get('purchaseId'));
      if(id){
        console.log("Purchase id in not NaN ", id);
        this.purchaseId = id;
      }
      this.getPurchase();
      this.setDate();

      this.fetchPurchaseReceipt();
  }

  setDate(){
    let  date = new Date();
    this.stringDate = date.toLocaleDateString();
 }
 
 getPurchase(){
   if(this.purchaseId!==undefined)
   this.purchaseService.getPurchase(this.purchaseId).subscribe({
     next:(data)=>{
        this.purchase = data;
        console.log(data);
        this.supplierName = 
        this.purchase.supplier.name;
     }
   })
 }

 saveReceipt(){
  
  this.purchaseReceiptService.save(this.purchase).subscribe({
    next:(data)=>{
       this.toggleEnablePrint();
       console.log("Receipt",data);
       alert(`Recu sauvegardé avec succès`);
    },
    error:(err)=>{
      console.log("Could not save receitp",err);  
    }
  })
}

 fetchPurchaseReceipt(){
  
  this.purchaseReceiptService
  .getReceipt(this.purchaseId).subscribe({
    next:(resp)=>{
         if(resp!==null){
          this.isSaved = true;
          this.disablePrintBtn = false;
          this.disableDownloadBtn = false;
         }
         console.log(`Purchase receipt fetched successfully`,resp);
    }
  });
}

onConfirm(){
  this.disableValidate = false;
}
 
setTTC(ttc: number){
  this.ttc=ttc;
}

setAmountPaid(amountPaid:number){
  this.amountPaid = amountPaid;
}

toggleEnablePrint(){
  this.disableDownloadBtn = false;
  this.disablePrintBtn = false;
  this.isSaved = true;
}

fetchReceipt(){
  this.purchaseReceiptService.getReceipt(this.purchaseId).subscribe({
    next:(resp)=>{
         if(resp!==null){
          this.isSaved = true;
          this.disablePrintBtn = false;
          this.disableDownloadBtn = false;
         }
         console.log(`Receipt fetched successfully`,resp);
    }
  })
}

downloadPage(){
  console.log("Hello");
  this.captureService.getImage(this.receipt.nativeElement, true)
.pipe(
    tap((img: any) => {

                console.log("Hello");
                console.log(img);
            //  let file =   this.DataURIToBlob(img)
            //  console.log(file);
            this.download(img);
    })
).subscribe();
}

download(file: string){

  let img = document.createElement("img");

  img.src = file; 
     window.location.href = img.src.replace('image/png', 'image/octet-stream');
     console.log(`Up till here`);
     
     let container = document.createElement("div");
     container.appendChild(img);
     
     let winPrint = window.open('', 
                                '', 
                                `left=0,top=0,width=${this.receipt.width-50},
                                height=${this.receipt.height-50},
                                toolbar=0,scrollbars=0,status=0`);
        winPrint?.document.appendChild(container);
       winPrint?.print();
}

printPage(){
  window.print();
}

}
