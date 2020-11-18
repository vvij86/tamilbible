import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import * as tamilBibleData from '././constants/tamilBible.json';
import * as englishBibleData from '././constants/englishBible.json';
import * as teluguBibleData from '././constants/teluguBible.json';
@Injectable({
  providedIn: 'root'
})
export class BibleService {
  private languageInFullScreen: Subject<any>;
  languageInFullScreen$: Observable<any>;
  private languageInSearchScreen: Subject<any>;
  languageInSearchScreen$: Observable<any>;
  public selectedLangForFullScreen = 'tamil';
  public selectedLangForSearch = 'tamil';
  public showFullScreen = false;
  public bibleTamilDataObj: any = (tamilBibleData as any).default;
  public bibleEnglishDataObj: any = (englishBibleData as any).default;
  public bibleTeluguDataObj: any = (teluguBibleData as any).default;
  public bibleDataObj: any = this.bibleTamilDataObj;
  private http: HttpClient;
  constructor() {
    this.languageInFullScreen = new Subject();
    this.languageInFullScreen$ = this.languageInFullScreen.asObservable();
    this.languageInSearchScreen = new Subject();
    this.languageInSearchScreen$ = this.languageInSearchScreen.asObservable();
  }
  get(path: string): Observable<any> {
    return this.http.get<any>(path);
  }

  public setFullScreenLanguage(val): void {
    this.languageInFullScreen.next(val);
  }

  public setSearchScreenLanguage(val): void {
    this.languageInSearchScreen.next(val);
  }
}
