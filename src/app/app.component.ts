import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonStateService } from './common-state.service';
import { takeUntil, delay } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { SoftwareValidityService } from './software-validity.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Shreyu Agro Food Pvt. Ltd. - Krishnaji';
  imagePath = '../assets/icon.jpg';
  private destroyed = new Subject();
  showButtons = false;

  constructor(
    private commonStateService: CommonStateService,
    private router: Router,
    private softwareValidityService: SoftwareValidityService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.commonStateService.setCurrentComponentName('AppComponent');
    this.commonStateService.currentComponentName
      .pipe(takeUntil(this.destroyed), delay(0))
      .subscribe((res) => {
        if (res === 'AppComponent') {
          this.showButtons = true;
        } else {
          this.showButtons = false;
        }
      });
  }

  addViewProductRoute() {
    this.softwareValidityService
    .checkSoftwareValidity()
    .subscribe((res: boolean) => {
      if (res) {
        this.router.navigateByUrl('/productList');
      } else {
        // show popup of extend validity
        this.toastr.error('', 'Your Software Validity has been Expired, Please Contact Software Admins');
      }
    });
  }

  generateInvoiceRoute() {
    this.softwareValidityService
    .checkSoftwareValidity()
    .subscribe((res: boolean) => {
      if (res) {
        this.router.navigateByUrl('/generateInvoice');
      } else {
        // show popup of extend validity
        this.toastr.error('', 'Your Software Validity has been Expired, Please Contact Software Admins');
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
