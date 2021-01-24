import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-discount-dialog',
  templateUrl: './add-discount-dialog.component.html',
  styleUrls: ['./add-discount-dialog.component.css']
})
export class AddDiscountDialogComponent implements OnInit {

  discountForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddDiscountDialogComponent>,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.discountForm = this.fb.group({
      discount: []
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  applyDiscount() {
    this.dialogRef.close({ discount: Number(this.discountForm.get('discount').value) });
  }

}
