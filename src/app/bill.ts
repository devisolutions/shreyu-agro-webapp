export interface Bill {
  id?: number;
  buyerName: string;
  dateOfBill: string;
  buyerAddress: number;
  buyerEmail: number;
  buyerMobileNumber: number;
  buyerGSTNumber: number;
  discountRate: number;
  billAmount: number;
  finalBillAmount: number;
  totalBillTax?: number;
  totalTaxRate?: number;
  billItems: BillItems[];
}
export interface BillItems {
  productCode: number;
  name: string;
  productQuantity: number;
  weightInGms: number;
  price: number;
  sGst: number;
  cGst: number;
  hsnCode: string;
}
