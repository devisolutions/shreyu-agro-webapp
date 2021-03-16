import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetAllInvoicesComponent } from './get-all-invoices/get-all-invoices.component';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatToolbarModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatTableModule,
  MatIconModule,
  MatDialogModule,
  MatTooltipModule,
} from '@angular/material';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddDiscountDialogComponent } from './add-discount-dialog/add-discount-dialog.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { InvoiceViewerComponent } from './invoice-viewer/invoice-viewer.component';
import { NgxPrintModule } from 'ngx-print';
import { ProductsListComponent } from './products-list/products-list.component';
import { AddUpdateProductDialogComponent } from './add-update-product-dialog/add-update-product-dialog.component';
import { DeleteProductDialogComponent } from './delete-product-dialog/delete-product-dialog.component';

@NgModule({
  declarations: [AppComponent,
    GetAllInvoicesComponent,
    AddInvoiceComponent,
    AddDiscountDialogComponent,
    InvoiceViewerComponent,
    ProductsListComponent,
    AddUpdateProductDialogComponent,
    DeleteProductDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    BackButtonDisableModule.forRoot(),
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    NgxSpinnerModule,
    NgxPrintModule
  ],
  providers: [ToastrService, NgxSpinnerService],
  bootstrap: [AppComponent],
  entryComponents: [AddDiscountDialogComponent, AddUpdateProductDialogComponent, DeleteProductDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
