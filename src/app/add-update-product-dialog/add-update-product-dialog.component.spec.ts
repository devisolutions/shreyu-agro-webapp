import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateProductDialogComponent } from './add-update-product-dialog.component';

describe('AddUpdateProductDialogComponent', () => {
  let component: AddUpdateProductDialogComponent;
  let fixture: ComponentFixture<AddUpdateProductDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateProductDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
