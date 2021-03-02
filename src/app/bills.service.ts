import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Bill } from './bill';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class BillsService {
  private baseURL = 'http://localhost:8080/shreyu-agro/bill';
  private devURL = 'http://localhost:8080/bill';

  constructor(private httpClient: HttpClient,
              private toastr: ToastrService) { }

  getAllBills(): Observable<Bill[]> {
    return this.httpClient.get<Bill[]>(`${this.baseURL}`);
  }
  createBill(bill: Bill): Observable<any> {
    return this.httpClient.post(`${this.baseURL}`, bill).pipe(
      tap(() => {
        this.toastr.success('Successful', 'Invoice Generation');
      }),
      catchError((errorResponse) => {
        this.toastr.error('Failed', 'Invoice Generation');
        return of(null);
      })
    );
  }
  getBillById(id: number): Observable<Bill> {
    return this.httpClient.get<Bill>(`${this.baseURL}/${id}`);
  }
}
