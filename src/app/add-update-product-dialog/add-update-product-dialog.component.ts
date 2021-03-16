import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../product';

@Component({
  selector: 'app-add-update-product-dialog',
  templateUrl: './add-update-product-dialog.component.html',
  styleUrls: ['./add-update-product-dialog.component.css']
})
export class AddUpdateProductDialogComponent implements OnInit {

  label = 'Add Product';
  isAddProduct = true;
  addProductForm: FormGroup;
  currentProduct: Product;
  currentProductCode: number;

  constructor(public dialogRef: MatDialogRef<AddUpdateProductDialogComponent>,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.currentProductCode = this.data.productCode;
    this.createform();
    this.addProductForm.get('code').setValue(this.currentProductCode);
    if (this.data.currentProduct) {
      this.label = 'Update Product';
      this.isAddProduct = false;
      this.addProductForm.setValue(this.data.currentProduct);
    }
  }

  createform() {
    this.addProductForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      weightInGms: ['', Validators.required],
      hsnCode: ['', Validators.required],
      price: ['', Validators.required],
      itemsPerBox: ['', Validators.required],
      cgst: ['', Validators.required],
      sgst: ['', Validators.required]
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  addUpdateProduct() {
    this.dialogRef.close({isAddProduct: this.isAddProduct, productData: this.addProductForm.value});
  }

}
