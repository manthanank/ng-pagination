import { TestBed } from '@angular/core/testing';

import { NgPaginationService } from './ng-pagination.service';

describe('NgPaginationService', () => {
  let service: NgPaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgPaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
