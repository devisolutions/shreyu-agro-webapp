import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseURL = 'http://localhost:8080/shreyu-agro/product';
  private devURL = 'http://localhost:8080/product';

  constructor(private httpClient: HttpClient) {}

  getProductsList(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseURL}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(`${this.baseURL}`, product);
  }

  deleteProduct(productCode: string): Observable<any> {
    return this.httpClient.delete(this.baseURL + '/' + productCode);
  }

  updateProduct(product: Product): Observable<any> {
    return this.httpClient.post<Product>(this.baseURL + '/' + product.code, product);
  }
}
