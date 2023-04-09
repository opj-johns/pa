import { Product } from "./product";
import { Purchase } from "./purchase";

export class PurchaseDetail{
    id!: number;
    purchasePrice!: number;
    sellingPrice!:number;
    quantity!:number;
    product!: Product;
    purchase!:Purchase;
}

export class Detail{
    purchasePrice!: number;
    sellingPrice!:number;
    quantity!:number;
}