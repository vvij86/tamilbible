import { Component, OnInit } from '@angular/core';
import { VoiceRecognitionService } from 'src/app/VoiceRecognitionService.service';

@Component({
  selector: 'app-voice-search',
  templateUrl: './voice-search.component.html',
  styleUrls: ['./voice-search.component.css']
})
export class VoiceSearchComponent implements OnInit {

  constructor(
    public service: VoiceRecognitionService
  ) {
    this.service.init();
  }

  ngOnInit(): void {
  }

  startService(): void {
    this.service.start();
  }

  stopService(): void {
    this.service.stop();
  }

  clearText(): void {
    this.service.text = '';
  }

}
