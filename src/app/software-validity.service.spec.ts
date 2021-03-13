import { TestBed } from '@angular/core/testing';

import { SoftwareValidityService } from './software-validity.service';

describe('SoftwareValidityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SoftwareValidityService = TestBed.get(SoftwareValidityService);
    expect(service).toBeTruthy();
  });
});
