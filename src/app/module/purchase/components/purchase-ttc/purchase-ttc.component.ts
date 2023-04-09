import { Component, OnInit } from '@angular/core';
import { PurchaseInteractionService } from 'src/app/service/purchase-interaction.service';

@Component({
  selector: 'app-purchase-ttc',
  templateUrl: './purchase-ttc.component.html',
  styleUrls: ['./purchase-ttc.component.scss']
})
export class PurchaseTTCComponent implements OnInit {

   ttc:number=0;
  totalQuantity: number=0;

  constructor(private purchaseInterService: PurchaseInteractionService) { }

  ngOnInit(): void {
    this.TTCChanges();
    this.quantityChnages();
  }


  TTCChanges(){
    this.purchaseInterService.totalPurchaseAmountSubject.subscribe({
      next:(ttc)=>{
        this.ttc= ttc;
      }
    });
  }

  quantityChnages(){
    this.purchaseInterService.totalQuantitySubject.subscribe({
      next:(quantity)=>{
        this.totalQuantity= quantity;
      }
    })
  }

}
