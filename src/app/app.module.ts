import { FullScreenComponent } from './global/full-screen/full-screen.component';

import { BibleService } from './bible-service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { MainComponentComponent } from './main-component/main-component.component';
import { LeftPaneComponentComponent } from './left-pane-component/left-pane-component.component';
import { SearchHistoryComponent } from './content/search-history/search-history.component';
import { VoiceSearchComponent } from './content/voice-search/voice-search.component';
import { SearchComponent } from './content/search/search.component';
import { QuickSearchComponent } from './content/quick-search/quick-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponentComponent,
    MainComponentComponent,
    LeftPaneComponentComponent,
    SearchHistoryComponent,
    VoiceSearchComponent,
    SearchComponent,
    QuickSearchComponent,
    FullScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule
  ],
  providers: [BibleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
