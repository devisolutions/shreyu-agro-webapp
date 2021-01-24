import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from '../products.service';
import { CommonStateService } from '../common-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-all-invoices',
  templateUrl: './get-all-invoices.component.html',
  styleUrls: ['./get-all-invoices.component.css']
})
export class GetAllInvoicesComponent implements OnInit {

  products: Product[];

  constructor(private productsService: ProductsService,
              public commonStateService: CommonStateService,
              private router: Router) { }

  ngOnInit() {
    this.commonStateService.setCurrentComponentName('GetAllInvoicesComponent');
  }

  getAllProducts() {
    this.productsService.getProductsList().subscribe(data => {
      console.log(data);
      //this.products = data;
    });
    //console.log(this.products)
  }

  routeToAppComponent(): void {
    this.router.navigate(['/']);
    this.commonStateService.setCurrentComponentName('AppComponent');
  }

}
