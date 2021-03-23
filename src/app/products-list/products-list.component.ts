import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { CommonStateService } from '../common-state.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddUpdateProductDialogComponent } from '../add-update-product-dialog/add-update-product-dialog.component';
import { DeleteProductDialogComponent } from '../delete-product-dialog/delete-product-dialog.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  productList: Product[];
  displayedColumns: string[] = ['code', 'name', 'weight', 'hsn_code', 'price', 'items_per_box', 'cgst', 'sgst', 'edit', 'delete'];
  currentProductCode: number;
  buttonLabel = 'Add Product';

  constructor(private productsService: ProductsService,
              private commonStateService: CommonStateService,
              private toastr: ToastrService,
              private router: Router,
              public dialog: MatDialog,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.commonStateService.setCurrentComponentName('ProductsListComponent');
    this.loadExistingProducts();
  }

  loadExistingProducts() {
    this.productsService.getProductsList().subscribe((products) => {
      this.productList = products;
      this.currentProductCode = this.productList[this.productList.length - 1].code + 1;
    });
  }

  addProduct() {
    this.openDialog(null, this.currentProductCode);
    this.loadExistingProducts();
  }

  routeToAppComponent(): void {
    this.router.navigate(['/']);
    this.commonStateService.setCurrentComponentName('AppComponent');
  }

  deleteProduct(code: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'dialog-with-toolbar';
    dialogConfig.minWidth = '40%';
    dialogConfig.position = {
      top: '10%',
      left: '30%',
    };
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(
      DeleteProductDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.productsService.deleteProduct(code).subscribe((delRes: boolean) => {
          if (delRes) {
            this.toastr.success('Product deleted successfully');
            this.loadExistingProducts();
          } else {
            this.toastr.error('Product cannot be deleted as it has been added to one of the previous bills');
          }
        });
      }
    });
  }

  editProduct(currentProduct: Product) {
    this.openDialog(currentProduct, currentProduct.code);
    this.loadExistingProducts();
  }

  openDialog(currentProduct: Product, productCode: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'dialog-with-toolbar';
    dialogConfig.minWidth = '40%';
    dialogConfig.position = {
      top: '10%',
      left: '30%',
    };
    dialogConfig.data = {
      currentProduct,
      productCode
    };
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(
      AddUpdateProductDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res && res.isAddProduct) {
        this.productsService.addProduct(res.productData).subscribe(() => {
          this.loadExistingProducts();
          this.toastr.success('Product added successfully');
        });
      } else {
        this.productsService.updateProduct(res.productData).subscribe(() => {
          this.loadExistingProducts();
          this.toastr.success('Product updated successfully');
        });
      }
    });
  }
}
