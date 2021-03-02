import { Component, OnInit } from '@angular/core';
import { CommonStateService } from '../common-state.service';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { FormGroup, FormBuilder } from '@angular/forms';
import { distinctUntilChanged, take } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddDiscountDialogComponent } from '../add-discount-dialog/add-discount-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { BillItems, Bill } from '../bill';
import { BillsService } from '../bills.service';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css'],
})
export class AddInvoiceComponent implements OnInit {
  productListCopy: Product[];
  productList: Product[];

  buyerDetailsForm: FormGroup;
  productDetailsForm: FormGroup;
  priceForm: FormGroup;

  displayedColumns = [
    'product_code',
    'product_name',
    'product_weight',
    'hsn_code',
    'product_price',
    'product_quantity',
    'product_cgst',
    'product_sgst',
    'delete_action',
  ];
  dataSource: Product[] = [];
  billItems: BillItems[] = [];

  constructor(
    private commonStateService: CommonStateService,
    private router: Router,
    private productsService: ProductsService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private billService: BillsService
  ) {}

  ngOnInit() {
    this.createInvoiceForm();
    this.commonStateService.setCurrentComponentName('AddInvoiceComponent');
    this.productsService.getProductsList().subscribe((products) => {
      this.productList = products;
      this.productListCopy = products;
    });
    this.productDetailsForm
      .get('select_code')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value: number) => {
        this.productList = this.productListCopy;
        if (value) {
          this.productList = this.productList.filter(
            (product) => String(product.code).startsWith(String(value))
          );
        }
      });
    // this.priceForm.get('discount').valueChanges
    //   .pipe(distinctUntilChanged())
    //   .subscribe((discount: number) => {
    //     this.calculateDiscountedPrice(discount);
    //   });
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  calculateDiscountedPrice(discount: number) {
    if (Number(discount) === 0) {
      this.priceForm
        .get('discountedPrice')
        .setValue(this.priceForm.get('totalPrice').value);
    } else if (Number(discount) === 100) {
      this.priceForm.get('discountedPrice').setValue(0);
    } else {
      let discountedPrice = 0;
      this.dataSource.forEach((data) => {
        const eachProductPrice = data.price * data.quantity;
        const discountedProductPrice =
          eachProductPrice - (eachProductPrice * Number(discount)) / 100;
        discountedPrice =
          discountedPrice +
          discountedProductPrice +
          ((data.sgst + data.cgst) * discountedProductPrice) / 100;
      });
      this.priceForm
        .get('discountedPrice')
        .setValue(discountedPrice.toFixed(2));
    }
  }

  createInvoiceForm() {
    this.buyerDetailsForm = this.fb.group({
      buyerName: [''],
      buyerMobileNumber: [''],
      buyerEmail: [''],
      buyerGSTNumber: [''],
      buyerAddress: [''],
    });
    this.productDetailsForm = this.fb.group({
      select_code: [],
      code: [],
      name: [''],
      weightInGms: [],
      price: [],
      cgst: [],
      sgst: [],
      quantity: [],
    });
    this.priceForm = this.fb.group({
      totalPrice: [0],
      discount: [0],
      discountedPrice: [0],
    });
  }

  routeToAppComponent(): void {
    this.buyerDetailsForm.reset();
    this.priceForm.reset();
    this.productDetailsForm.reset();
    this.router.navigate(['/']);
    this.commonStateService.setCurrentComponentName('AppComponent');
  }

  addProduct() {
    const currentCode = this.productDetailsForm.get('select_code').value;
    const quantity = this.productDetailsForm.get('quantity').value;
    if (currentCode && quantity) {
      if (
        this.dataSource.filter((data) => data.code === currentCode).length === 0
      ) {
        const currentProduct = this.productList.filter(
          (product) => product.code === currentCode
        );
        if (currentProduct.length > 0) {
          let addProduct = currentProduct[0];
          addProduct = { ...addProduct, quantity };
          this.dataSource.push(addProduct);
          this.dataSource = this.dataSource.slice();
          this.toastr.success('Product added successfully', 'Add Product');
        } else {
          this.toastr.error('please enter valid product code', 'Add Product');
        }
      } else {
        this.toastr.error('product already exists', 'Add Product');
      }
    } else {
      this.toastr.error(
        'please enter product code and quantity',
        'Add Product'
      );
    }
    this.productDetailsForm.get('select_code').setValue('');
    this.productDetailsForm.get('quantity').setValue('');
    this.resetDiscount();
    this.updatePrice();
  }
  resetDiscount() {
    this.priceForm.get('discount').setValue(0);
    this.priceForm.get('discountedPrice').setValue(0);
  }
  updatePrice() {
    let totalPrice = 0;
    this.dataSource.forEach((data) => {
      const productPrice = data.price * data.quantity;
      const productGst = ((data.sgst + data.cgst) * productPrice) / 100;
      totalPrice = totalPrice + productPrice + productGst;
    });
    this.priceForm.get('totalPrice').setValue(totalPrice.toFixed(2));
    // this.calculateDiscountedPrice(this.priceForm.get('discount').value);
  }

  deleteProduct(code: number) {
    const currentProduct = this.dataSource.filter((data) => data.code === code);
    if (currentProduct.length > 0) {
      let totalPrice = this.priceForm.get('totalPrice').value;
      const productPrice = currentProduct[0].price * currentProduct[0].quantity;
      const productGst =
        ((currentProduct[0].sgst + currentProduct[0].cgst) * productPrice) /
        100;
      totalPrice = totalPrice - productPrice - productGst;
      this.priceForm.get('totalPrice').setValue(totalPrice);
      this.toastr.success('Product deleted successfully', 'Delete Product');
      // this.calculateDiscountedPrice(this.priceForm.get('discount').value);
    }
    this.resetDiscount();
    this.dataSource = this.dataSource.filter((data) => data.code !== code);
  }

  generateInvoice() {
    // TODO undefined check
    this.spinner.show();
    this.dataSource
      .map((item) => {
        return {
          productCode: item.code,
          productQuantity: item.quantity,
        };
      })
      .forEach((item: BillItems) => this.billItems.push(item));
    const bill = {
      buyerName: this.buyerDetailsForm.get('buyerName').value,
      buyerMobileNumber: this.buyerDetailsForm.get('buyerMobileNumber').value,
      buyerEmail: this.buyerDetailsForm.get('buyerEmail').value,
      buyerGSTNumber: this.buyerDetailsForm.get('buyerGSTNumber').value,
      buyerAddress: this.buyerDetailsForm.get('buyerAddress').value,
      billAmount: this.priceForm.get('totalPrice').value,
      discountRate: this.priceForm.get('discount').value,
      finalBillAmount:
        this.priceForm.get('discountedPrice').value !== 0
          ? this.priceForm.get('discountedPrice').value
          : this.priceForm.get('totalPrice').value,
      dateOfBill: moment(new Date().toISOString()).format('YYYY-MM-DD'),
      billItems: this.billItems,
    };
    this.billService
      .createBill(bill)
      .pipe(take(1))
      .subscribe((eachBill: Bill) => {
        if (eachBill) {
          this.spinner.hide();
          this.router.navigate(['previewInvoice', eachBill.id]);
        }
      });
  }

  applyDiscount() {
    this.openDialog();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'dialog-with-toolbar';
    dialogConfig.minWidth = '40%';
    dialogConfig.position = {
      top: '20%',
      left: '30%',
    };
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(
      AddDiscountDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.priceForm.get('discount').setValue(res.discount);
        this.calculateDiscountedPrice(res.discount);
      }
    });
  }
}
