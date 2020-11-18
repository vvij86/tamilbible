import { BibleService } from './../../bible-service';
import { ChapterNames } from './../../constants/ChapterNames';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import * as data from './../../constants/tamilBible.json';
import { HostListener } from '@angular/core';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  chapters = [];
  bibleDataObj: any = (data as any).default;
  nsad;
  verses;
  showChapter = false;
  showVerse = false;
  noOfChapters = 0;
  noOfVerses = 0;
  currentBook;
  showFullScreen = false;
  verseToShow = '';
  currectChapter;
  constructor(private bibService: BibleService) { }

  ngOnInit(): void {
    this.chapters = ChapterNames.chapNamesInTamil;
    this.showChapter = false;
    this.showVerse = false;
    this.showFullScreen = false;
  }

  public onClick_Book(value: any): void {
    this.currentBook = value;
    this.showChapter = true;
    this.noOfChapters = this.bibleDataObj.Book[value].Chapter.length;
  }

  counter(i: number): any {
    return new Array(i);
  }

  public onClick_Chapter(val): void {
    this.currectChapter = val;
    this.showChapter = false;
    this.showVerse = true;
    this.noOfVerses = this.bibleDataObj.Book[this.currentBook].Chapter[val].Verse.length;
  }
  public onClick_Verse(value: any): void {
    this.bibService.showFullScreen = true;
    this.verseToShow = this.bibleDataObj.Book[this.currentBook].Chapter[this.currectChapter].Verse[value].Verse;
  }

  isShowFullScreen(): boolean {
    return this.bibService.showFullScreen;
  }

  ngOnDestroy(): void {
    this.showChapter = false;
    this.showVerse = false;
    this.showFullScreen = false;
    this.currentBook = null;
  }
}
