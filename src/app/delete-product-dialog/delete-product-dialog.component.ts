import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-product-dialog',
  templateUrl: './delete-product-dialog.component.html',
  styleUrls: ['./delete-product-dialog.component.css']
})
export class DeleteProductDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteProductDialogComponent>) { }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close(false);
  }

  delete() {
    this.dialogRef.close(true);
  }
}
