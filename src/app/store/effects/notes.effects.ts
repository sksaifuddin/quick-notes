import { NotesApiService } from './../../services/notes-api.service';
import { 
    AddNotesAction, 
    NotesActionTypes, 
    AddNotesSuccessAction, 
    LoadNotesSuccessAction,
    DeleteAllNotesAction, 
    DeleteAllNotesSuccessAction, 
    DeleteNotesAction,
    DeleteNotesSuccessAction
} from './../actions/notes.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class NotesEffects {

    @Effect() loadNotes$ = this.actions$.pipe(
        ofType<LoadNotesSuccessAction>(NotesActionTypes.LOAD_NOTES_ACTION),
        switchMap(
            () => this.notesApiService.getAll().pipe(
                map((data) => new LoadNotesSuccessAction(data)),
                catchError(err => of(err))
            )
        )
    )

    @Effect() addNotesItem$ = this.actions$.pipe(
        ofType<AddNotesAction>(NotesActionTypes.ADD_NOTES),
        switchMap(
            (data) => this.notesApiService.save(data.payload).pipe(
                map(() => new AddNotesSuccessAction(data.payload)),
                catchError(err => of(err))
            )
        )
    )

    @Effect() deleteAllNotes$ = this.actions$.pipe(
        ofType<DeleteAllNotesAction>(NotesActionTypes.DELETE_ALL_NOTES_ACTION),
        switchMap(
            (data) => this.notesApiService.deleteAll().pipe(
                map(() => new DeleteAllNotesSuccessAction()),
                catchError(err => of(err))
            )
        )
    )

    @Effect() deleteNotes$ = this.actions$.pipe(
        ofType<DeleteNotesAction>(NotesActionTypes.DELETE_NOTE_ACTION),
        switchMap(
            (data) => this.notesApiService.deleteById(data.payload).pipe(
                map(() => new DeleteNotesSuccessAction()),
                catchError(err => of(err))
            )
        )
    )


    constructor(private actions$: Actions, private notesApiService: NotesApiService) {}

}