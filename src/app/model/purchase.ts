import { PurchaseDetail } from "./purchase-detail";
import { PurchaseStatus } from "./purchase-status";
import { Supplier } from "./supplier";

export class Purchase{
    id!:number;
    date!:Date;
    supplier!: Supplier;
    status!: PurchaseStatus; 
}

export class PurchaseWrapper {
    purchase!: Purchase;
    purchaseDetails!: PurchaseDetail[];
}