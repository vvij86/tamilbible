import { SearchChapterNames } from './../../constants/SearchChapterNames';
import { ChapterNames } from './../../constants/ChapterNames';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BibleService } from 'src/app/bible-service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
export interface SearchBook {
  displayName: string;
  relatedText: string[];
  id?: number;
}

@Component({
  selector: 'app-quick-search',
  templateUrl: './quick-search.component.html',
  styleUrls: ['./quick-search.component.css']
})

export class QuickSearchComponent implements OnInit, OnDestroy {
  @ViewChild('inputChapter', { static: false }) inputChp: ElementRef;
  verseToShow = '';
  verseNo = 1;
  verseDetails = '';
  maxVerse = 0;
  bookId = 1;
  chapterNo = 1;
  options: SearchBook[];
  sub: Subscription;
  filteredOptions: Observable<SearchBook[]>;
  quickSearchForm: FormGroup;
  myControl = new FormControl();
  chapters = [];
  bibleDataObj: any;
  fullScreeenSubscriber: Subscription;
  searchLanguageSubscriber: Subscription;
  constructor(private bibService: BibleService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.bibleDataObj = this.bibService.bibleDataObj;
    this.chapters = ChapterNames.chapNamesInTamil;
    this.options = SearchChapterNames.bookNamesTamil;
    this.fullScreeenSubscriber = this.bibService.languageInFullScreen$.subscribe((langData) => {
      if (langData) {
        switch (langData) {
          case 'tamil':
            this.bibleDataObj = this.bibService.bibleTamilDataObj;
            break;
          case 'english':
            this.bibleDataObj = this.bibService.bibleEnglishDataObj;
            break;
          case 'telugu':
            this.bibleDataObj = this.bibService.bibleTeluguDataObj;
            break;
        }
      }
    });
    this.searchLanguageSubscriber = this.bibService.languageInSearchScreen$.subscribe((langData) => {
      if (langData) {
        const capData = ChapterNames.capitalizeFirstLetter(langData.toString());
        const selChapLanguae = 'chapNamesIn' + capData;
        const bookName = 'bookNames' + capData;
        this.chapters = ChapterNames[selChapLanguae];
        this.options = SearchChapterNames[bookName];
        this.cd.detectChanges();
      }
    });

    this.quickSearchForm = new FormGroup({
      txtChapter: new FormControl(''),
      txtVerse: new FormControl('')
    });

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }

  setChapterFocus(): void {

  }

  displayFn(user: SearchBook): string {
    return user && user.displayName ? user.displayName : '';
  }

  private _filter(name: string): SearchBook[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.relatedText.toString().toLowerCase().includes(filterValue) === true);
  }

  onSubmit(): void {
    this.bibService.showFullScreen = true;
    this.verseToShow = (this.quickSearchForm.controls.txtVerse.value ? this.quickSearchForm.controls.txtVerse.value :
      1) + '.' + this.bibleDataObj.Book[(this.myControl.value.id ? this.myControl.value.id : 0)]
        .Chapter[(this.quickSearchForm.controls.txtChapter.value ? this.quickSearchForm.controls.txtChapter.value - 1 : 0)]
        .Verse[(this.quickSearchForm.controls.txtVerse.value ? this.quickSearchForm.controls.txtVerse.value - 1 : 0)].Verse;
    const selLanguae = 'chapNamesIn' + ChapterNames.capitalizeFirstLetter(this.bibService.selectedLangForFullScreen.toString());
    this.verseDetails = ChapterNames[selLanguae][(this.myControl.value.id ? this.myControl.value.id :
      0)] + ' ' + (this.quickSearchForm.controls.txtChapter.value ? this.quickSearchForm.controls.txtChapter.value : 1) + ':'
      + (this.quickSearchForm.controls.txtVerse.value ? this.quickSearchForm.controls.txtVerse.value : 1);
    this.maxVerse = this.bibleDataObj.Book[(this.myControl.value.id ? this.myControl.value.id : 0)]
      .Chapter[(this.quickSearchForm.controls.txtChapter.value ? this.quickSearchForm.controls.txtChapter.value - 1 : 0)]
      .Verse.length;
    this.bookId = this.myControl.value.id ? this.myControl.value.id : 0;
    this.chapterNo = (this.quickSearchForm.controls.txtChapter.value ? this.quickSearchForm.controls.txtChapter.value - 1 : 0);
    this.verseNo = (this.quickSearchForm.controls.txtVerse.value ? this.quickSearchForm.controls.txtVerse.value - 1 : 0);
  }



  isShowFullScreen(): boolean {
    return this.bibService.showFullScreen;
  }

  onClick_Book(book: string): void {
    this.resetFormValues();
    const bookObj = this.options.find((val) => val.displayName === book ? val : null);
    this.myControl.setValue(bookObj);
    setTimeout(() => this.inputChp.nativeElement.focus());
  }

  resetFormValues(): void {
    this.myControl.reset();
    this.quickSearchForm.controls.txtChapter.reset();
    this.quickSearchForm.controls.txtVerse.reset();
    this.verseToShow = null;
    this.verseDetails = null;
    this.maxVerse = 0;
    this.bookId = 0;
    this.chapterNo = 0;
    this.verseNo = 0;
  }

  ngOnDestroy(): void {
    this.fullScreeenSubscriber.unsubscribe();
    this.searchLanguageSubscriber.unsubscribe();
  }

}
