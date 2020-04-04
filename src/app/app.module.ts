import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store'; 
import { ReactiveFormsModule } from '@angular/forms';
import { SideBarSectionComponent } from './components/side-bar-section/side-bar-section.component';
import { NotesMainSectionComponent } from './components/notes-main-section/notes-main-section.component';
import { NotesSummaryCardComponent } from './components/notes-summary-card/notes-summary-card.component';
import { NotesReducer } from './store/reducers/notes.reducers';

@NgModule({
  declarations: [
    AppComponent,
    SideBarSectionComponent,
    NotesMainSectionComponent,
    NotesSummaryCardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      notesState: NotesReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
