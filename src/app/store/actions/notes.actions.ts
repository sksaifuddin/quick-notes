import { Notes } from "./../../models/notes.model";
import { Action } from "@ngrx/store";

export enum NotesActionTypes {
  TYPING_NOTES = "Typing Notes",
  ADD_NOTES = "Add Notes",
  ADD_NOTES_SUCCESS = "Add Notes Success",
  LOAD_NOTES_ACTION = "Load Notes",
  LOAD_NOTES_SUCCESS = "Load Notes Success",
  DELETE_ALL_NOTES_ACTION = "Delete All Notes",
  DELETE_ALL_NOTES_SUCCESS = "Delete All Notes Success",
  DELETE_NOTE_ACTION = "Delete selected Notes Action",
  DELETE_NOTE_SUCCESS = "Delete Selected Notes Success",
}

export class TypingNotesAction implements Action {
  readonly type = NotesActionTypes.TYPING_NOTES;

  constructor(public payload: Notes) {}
}

export class LoadNotesAction implements Action {
  readonly type = NotesActionTypes.LOAD_NOTES_ACTION;
}
export class LoadNotesSuccessAction implements Action {
  readonly type = NotesActionTypes.LOAD_NOTES_SUCCESS;

  constructor(public payload: Array<Notes>) {}
}

export class AddNotesAction implements Action {
  readonly type = NotesActionTypes.ADD_NOTES;

  constructor(public payload: Notes) {}
}

export class AddNotesSuccessAction implements Action {
  readonly type = NotesActionTypes.ADD_NOTES_SUCCESS;

  constructor(public payload: Notes) {}
}

export class DeleteAllNotesAction implements Action {
    readonly type = NotesActionTypes.DELETE_ALL_NOTES_ACTION;
}

export class DeleteAllNotesSuccessAction implements Action {
    readonly type = NotesActionTypes.DELETE_ALL_NOTES_SUCCESS;
}

export class DeleteNotesAction implements Action {
    readonly type = NotesActionTypes.DELETE_NOTE_ACTION;

    constructor(public payload: string) {}
} 

export class DeleteNotesSuccessAction implements Action {
    readonly type = NotesActionTypes.DELETE_NOTE_SUCCESS;
}

export type NotesAction =
  | TypingNotesAction
  | AddNotesAction
  | AddNotesSuccessAction
  | LoadNotesAction
  | LoadNotesSuccessAction
  | DeleteAllNotesAction
  | DeleteAllNotesSuccessAction
  | DeleteNotesAction
  | DeleteAllNotesSuccessAction
  ;
