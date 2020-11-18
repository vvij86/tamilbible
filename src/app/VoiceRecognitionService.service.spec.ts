/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VoiceRecognitionServiceService } from './VoiceRecognitionService.service';

describe('Service: VoiceRecognitionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VoiceRecognitionServiceService]
    });
  });

  it('should ...', inject([VoiceRecognitionServiceService], (service: VoiceRecognitionServiceService) => {
    expect(service).toBeTruthy();
  }));
});
