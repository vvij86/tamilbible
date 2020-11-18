import { OnDestroy, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { BibleService } from './bible-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'tamilBible';
  subscribers: Subscription;
  constructor(private bibService: BibleService) { }
  ngOnInit(): void {
    this.subscribers = this.bibService.languageInFullScreen$.subscribe((langData) => {
      if (langData) {
        switch (langData) {
          case 'tamil':
            this.bibService.bibleDataObj = this.bibService.bibleTamilDataObj;
            break;
          case 'english':
            this.bibService.bibleDataObj = this.bibService.bibleEnglishDataObj;
            break;
          case 'telugu':
            this.bibService.bibleDataObj = this.bibService.bibleTeluguDataObj;
            break;
        }
      }
    });
  }
  onFullScreenLangChange(val): void {
    this.bibService.selectedLangForFullScreen = val;
    this.bibService.setFullScreenLanguage(val);
  }

  onSearchLangChange(val): void {
    this.bibService.selectedLangForSearch = val;
    this.bibService.setSearchScreenLanguage(val);
  }

  ngOnDestroy(): void {
    this.subscribers.unsubscribe();
  }
}
