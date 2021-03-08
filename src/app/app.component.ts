import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonStateService } from './common-state.service';
import { takeUntil, distinctUntilChanged, delay } from 'rxjs/operators';
import { Subject } from 'rxjs';

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

  constructor(private commonStateService: CommonStateService) {}

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

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
