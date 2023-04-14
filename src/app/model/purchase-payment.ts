import { PaymentType } from "./payment-type";
import { Purchase } from "./purchase";

export class PurchasePayment{
    id!:number;
    amount_paid!:number;
    date!:string;
    paymentType!:PaymentType;
    purchase!:Purchase;
}