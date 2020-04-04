import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SideBarSectionComponent } from './components/side-bar-section/side-bar-section.component';
import { NotesMainSectionComponent } from './components/notes-main-section/notes-main-section.component';
import { NotesSummaryCardComponent } from './components/notes-summary-card/notes-summary-card.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarSectionComponent,
    NotesMainSectionComponent,
    NotesSummaryCardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
