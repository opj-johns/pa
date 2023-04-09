import { Component, OnInit } from '@angular/core';
import { PurchaseInteractionService } from 'src/app/service/purchase-interaction.service';

@Component({
  selector: 'app-purchase-date',
  templateUrl: './purchase-date.component.html',
  styleUrls: ['./purchase-date.component.scss']
})
export class PurchaseDateComponent implements OnInit {

  date!: Date;

  constructor(private purchaseInteractionService:PurchaseInteractionService) { }



  ngOnInit(): void {
  }
  
  onDateChange(){
    this.purchaseInteractionService.updatePurchaseDate(this.date);
  }
}
