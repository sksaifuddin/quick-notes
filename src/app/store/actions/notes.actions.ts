import { Notes } from './../../models/notes.model';
import { Action } from '@ngrx/store';


export enum NotesActionTypes {
    TYPING_NOTES = 'Typing Notes',
}

export class TypingNotesAction implements Action {
    readonly type = NotesActionTypes.TYPING_NOTES;

    constructor(public payload: Notes) {}
}

export type TypingAction = TypingNotesAction;