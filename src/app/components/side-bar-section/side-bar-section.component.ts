import { DeleteAllNotesAction, DeleteNotesAction } from './../../store/actions/notes.actions';
import { UtilitiesService } from './../../services/utilities.service';
import { switchMap, pluck } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/app-state.model';
import { Observable } from 'rxjs';
import { Notes } from 'src/app/models/notes.model';
import { LoadNotesAction } from 'src/app/store/actions/notes.actions';
import { NotesApiService } from 'src/app/services/notes-api.service';

@Component({
  selector: 'app-side-bar-section',
  templateUrl: './side-bar-section.component.html',
  styleUrls: ['./side-bar-section.component.scss']
})
export class SideBarSectionComponent implements OnInit {
  notesItem$: Observable<Array<Notes>>;
  activeNoteId: string;
  constructor(private store: Store<AppState>, 
    private notesApiService: NotesApiService,
    private utiliyService: UtilitiesService) { }

  ngOnInit() {
    this.setSavedNotes();
    this.store.dispatch(new LoadNotesAction());
  }

  setSavedNotes(): void {
    this.notesItem$ = this.store.select((store: AppState) => this.utiliyService.removeDuplicates(store.notesState));
  }

  deleteAllNotes(): void {
    this.store.dispatch(new DeleteAllNotesAction());
    this.store.dispatch(new LoadNotesAction());
  }

  onNoteSelected(selectedNote: Notes) {
    this.activeNoteId = selectedNote.id
    this.utiliyService.setSelectedNote(selectedNote);
  }

  deleteSelectedNote(): void {
    this.store.dispatch(new DeleteNotesAction(this.activeNoteId));
    this.store.dispatch(new LoadNotesAction());
  }  

}
