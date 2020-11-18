import { QuickSearchComponent } from './content/quick-search/quick-search.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './content/search/search.component';
import { VoiceSearchComponent } from './content/voice-search/voice-search.component';
import { SearchHistoryComponent } from './content/search-history/search-history.component';


const routes: Routes = [
  { path: 'quick/search', component: QuickSearchComponent },
  { path: 'search', component: SearchComponent },
  { path: 'voice/search', component: VoiceSearchComponent },
  { path: 'search/history', component: SearchHistoryComponent },
  { path: '', redirectTo: 'quick/search', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
