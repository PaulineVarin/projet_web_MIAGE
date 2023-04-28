import { TestBed } from '@angular/core/testing';

import { ApiProjetWebService } from './api-projet-web.service';

describe('ApiProjetWebService', () => {
  let service: ApiProjetWebService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiProjetWebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
