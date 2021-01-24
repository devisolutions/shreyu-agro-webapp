import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonStateService {

  componentName: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor() { }

  setCurrentComponentName(componentName: string): void {
    this.componentName.next(componentName);
  }

  get currentComponentName(): Observable<string> {
    return this.componentName.asObservable();
  }
}
