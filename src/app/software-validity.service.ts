import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SoftwareValidityService {

  private baseURL = 'http://localhost:8080/shreyu-agro/validity';
  private devURL = 'http://localhost:8080/validity';

  constructor(private httpClient: HttpClient,
              private toastr: ToastrService) { }

  checkSoftwareValidity(): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.baseURL}`);
  }
}
