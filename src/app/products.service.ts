import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseURL = 'http://localhost:8080/springboot-backend/product';
  private devURL = 'http://localhost:8080/product';

  constructor(private httpClient: HttpClient) {}

  getProductsList(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseURL}`);
  }
}
