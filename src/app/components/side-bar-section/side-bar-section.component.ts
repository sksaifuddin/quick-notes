import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/app-state.model';
import { Observable } from 'rxjs';
import { Notes } from 'src/app/models/notes.model';

@Component({
  selector: 'app-side-bar-section',
  templateUrl: './side-bar-section.component.html',
  styleUrls: ['./side-bar-section.component.scss']
})
export class SideBarSectionComponent implements OnInit {
  notesItem$: Observable<Array<Notes>>;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.setSavedNotes();
  }

  setSavedNotes(): void {
    this.notesItem$ = this.store.select((store: AppState) => store.notesState);
  }

}
