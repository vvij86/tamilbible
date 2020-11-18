import { Input, ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BibleService } from 'src/app/bible-service';
import { ChapterNames } from 'src/app/constants/ChapterNames';
declare function fitText(el: any, kompressor: any, options: any): any;

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styleUrls: ['./full-screen.component.scss']
})
export class FullScreenComponent implements OnInit, OnDestroy {
  @Input() verseToShow;
  @Input() verseDetails;
  @Input() maxVerse;
  @Input() verseNo;
  @Input() bookId;
  @Input() chapterNo;
  elem: HTMLElement;
  @ViewChild('fullVerse', { static: true }) fullVerse: ElementRef;
  bibleDataObj: any;

  constructor(private el: ElementRef, private bibService: BibleService) { }

  @HostListener('fullscreenchange', ['$event'])
  handleKeyboardEvent(event): void {
    if (!document.fullscreenElement) {
      this.bibService.showFullScreen = false;
      document.exitFullscreen().catch(() => { });
    }
  }

  @HostListener('document:keydown.ArrowUp', ['$event']) onKeyUpHandler(event: KeyboardEvent): void {
    if (this.verseNo > 0) {
      this.verseNo--;
      this.showVersesOnKeyPress(this.verseNo);
    } else if (this.verseNo === 0) {
      this.verseNo = 0;
      this.showVersesOnKeyPress(this.verseNo);
    }
  }

  @HostListener('document:keydown.ArrowDown', ['$event']) onKeyDownHandler(event: KeyboardEvent): void {
    if (this.verseNo < this.maxVerse) {
      this.verseNo++;
      this.showVersesOnKeyPress(this.verseNo);
    }
  }

  showVersesOnKeyPress(verseNo: number): void {
    this.verseToShow = (verseNo + 1) + '.' + this.bibleDataObj.Book[this.bookId]
      .Chapter[this.chapterNo]
      .Verse[verseNo].Verse;
    const selLanguae = 'chapNamesIn' + ChapterNames.capitalizeFirstLetter(this.bibService.selectedLangForFullScreen.toString());
    this.verseDetails = ChapterNames[selLanguae][this.bookId] + ' ' + (this.chapterNo + 1) + ':' + (verseNo + 1);
  }

  onKeyDown(event: KeyboardEvent): void {

  }

  onLoad(): void {
    this.bibleDataObj = this.bibService.bibleDataObj;
  }
  ngOnInit(): void {
    this.onLoad();
    this.elem = this.el.nativeElement;
    const divEl: HTMLDivElement = this.fullVerse.nativeElement;
    this.openFullscreen();
    fitText(document.getElementById('fittext'), 3.2, null);
    divEl.click();
  }
  openFullscreen(): void {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    }
  }

  ngOnDestroy(): void {

  }
}
