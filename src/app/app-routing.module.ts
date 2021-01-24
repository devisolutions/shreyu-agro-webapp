import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetAllInvoicesComponent } from './get-all-invoices/get-all-invoices.component';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { InvoiceViewerComponent } from './invoice-viewer/invoice-viewer.component';

const routes: Routes = [
  { path: 'invoices', component: GetAllInvoicesComponent },
  { path: 'generateInvoice', component: AddInvoiceComponent },
  { path: 'previewInvoice/:id', component: InvoiceViewerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
