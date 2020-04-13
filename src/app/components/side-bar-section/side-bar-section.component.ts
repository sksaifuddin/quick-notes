import { DeleteAllNotesAction, DeleteNotesAction } from './../../store/actions/notes.actions';
import { UtilitiesService } from './../../services/utilities.service';
import { switchMap, pluck, filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/app-state.model';
import { Observable } from 'rxjs';
import { Notes } from 'src/app/models/notes.model';
import { LoadNotesAction } from 'src/app/store/actions/notes.actions';
import { NotesApiService } from 'src/app/services/notes-api.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-side-bar-section',
  templateUrl: './side-bar-section.component.html',
  styleUrls: ['./side-bar-section.component.scss'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate(1000)
      ]),
    ])
  ]
})
export class SideBarSectionComponent implements OnInit {
  notesItem$: Observable<Array<Notes>>;
  activeNoteId: string;
  searchValues: string;
  newNotes$:Observable<Notes>
  form: FormGroup;
  resetNewCard: symbol;
  constructor(private store: Store<AppState>, 
    private utilityService: UtilitiesService,
    private fb: FormBuilder,
    ) { this.buildForm(); }

    buildForm(): void {
      this.form = this.fb.group({
        searchText: "",
      });
    }
  

  ngOnInit() {
    this.setSavedNotes();
    this.store.dispatch(new LoadNotesAction());
    this.form.get('searchText').valueChanges.subscribe((data) => {
      this.searchValues = data;
    });
    this.newNotes$ = this.utilityService.getNewNotesObservable().pipe(filter((data: Notes) => this.activeNoteId === null || !data));
    this.utilityService.resetNewCardSubject.pipe(filter(Boolean)).subscribe(() => this.resetNewCard = Symbol(''));
  }

  setSavedNotes(): void {
    this.notesItem$ = this.store.select((store: AppState) => {
        this.activeNoteId = null;
        return this.utilityService.removeDuplicates(store.notesState)
    })
  }

  deleteAllNotes(): void {
    this.store.dispatch(new DeleteAllNotesAction());
    this.store.dispatch(new LoadNotesAction());
  }

  onNoteSelected(selectedNote: Notes) {
    this.activeNoteId = selectedNote.id;
    this.utilityService.setSelectedNote(selectedNote);
    this.resetNewCard = Symbol('');
  }

  deleteSelectedNote(): void {
    this.store.dispatch(new DeleteNotesAction(this.activeNoteId));
    this.store.dispatch(new LoadNotesAction());
  }  

  newNoteSelected(): void {
    this.resetNewCard = Symbol('');
    this.utilityService.setSelectedNote(null);
    this.activeNoteId = null;
  }

}
