/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BibleServiceService } from './bible-service.service';

describe('Service: BibleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BibleServiceService]
    });
  });

  it('should ...', inject([BibleServiceService], (service: BibleServiceService) => {
    expect(service).toBeTruthy();
  }));
});
