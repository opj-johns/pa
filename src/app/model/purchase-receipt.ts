import { Purchase } from "./purchase";

export class PurchaseReceipt{
    id!: number;
    date!:Date;
    purchase!:Purchase;
}