import { TestBed } from '@angular/core/testing';

import { CommonStateService } from './common-state.service';

describe('CommonStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonStateService = TestBed.get(CommonStateService);
    expect(service).toBeTruthy();
  });
});
