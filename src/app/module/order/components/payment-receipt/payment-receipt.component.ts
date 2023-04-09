import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxCaptureService } from 'ngx-capture';
import { tap } from 'rxjs';
import { ShopOrder } from 'src/app/model/shop-order';
import { OrderService } from 'src/app/service/order.service';
import { ReceiptService } from 'src/app/service/receipt.service';

@Component({
  selector: 'app-payment-receipt',
  templateUrl: './payment-receipt.component.html',
  styleUrls: ['./payment-receipt.component.scss']
})
export class PaymentReceiptComponent implements OnInit {

  orderId!:number;
  stringDate!: string; 
  order!:ShopOrder;
  employeeName: string ="";
  clientName:string = "";

  ttc: number = 0;
  amountPaid:number=0;
  disableValidate: boolean = true;
  disablePrint: boolean = true;
  @ViewChild("confirm") confirm!: ElementRef;
  @ViewChild('receipt', { static: true }) receipt: any;
  

  isSaved: boolean = false;
  constructor(private activatedRoute: ActivatedRoute,
    private orderService:OrderService, 
    private receiptService: ReceiptService,
    private captureService: NgxCaptureService) { }
   

  ngOnInit(): void {
      let id = Number(this.activatedRoute.snapshot.paramMap.get('orderId'));
      if(id !== NaN){
        console.log("Order id in not NaN ", id);
        this.orderId = id;
      }
      this.getOrder();
      this.setDate();

      this.fetchReceipt();
}

setDate(){
   let  date = new Date();
   this.stringDate = date.toLocaleDateString();
}

getOrder(){
  if(this.orderId!==undefined)
  this.orderService.getOrder(this.orderId).subscribe({
    next:(data)=>{
       this.order = data;
       this.employeeName = this.order.employee.firstName+" "+this.order.employee.lastName;
       this.clientName = this.order.client.firstName+" "+this.order.client.lastName;
    }
  })


 
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

saveReceipt(){
  
  this.receiptService.save(this.order).subscribe({
    next:(data)=>{

       this.toggleEnablePrint();
       console.log("Receipt",data);
    },
    error:(err)=>{
      console.log("Could not save receitp",err);  
    }
  })
}

toggleEnablePrint(){
  this.disablePrint = !this.disablePrint;
}


fetchReceipt(){
  
  this.receiptService.getReceipt(this.orderId).subscribe({
    next:(resp)=>{
         if(resp!==null){
          this.isSaved = true;
          this.disablePrint = false;
         }
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
