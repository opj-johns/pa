import { PaymentType } from "./payment-type";
import { Purchase } from "./purchase";

export class PurchasePayment{
    id!:number;
    amount!:number;
    date!:string;
    paymentType!:PaymentType;
    purchase!:Purchase;
}