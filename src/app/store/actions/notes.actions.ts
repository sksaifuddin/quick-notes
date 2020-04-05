import { Notes } from "./../../models/notes.model";
import { Action } from "@ngrx/store";

export enum NotesActionTypes {
  TYPING_NOTES = "Typing Notes",
  ADD_NOTES = "Add Notes",
  ADD_NOTES_SUCCESS = "Add Notes Success",
  LOAD_NOTES_ACTION = "Load Notes",
  LOAD_NOTES_SUCCESS = "Load Notes Success",
  DELETE_ALL_NOTES_ACTION = "Delete Notes",
  DELETE_ALL_NOTES_SUCCESS = "Delete Notes Success",
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

export type NotesAction =
  | TypingNotesAction
  | AddNotesAction
  | AddNotesSuccessAction
  | LoadNotesAction
  | LoadNotesSuccessAction
  | DeleteAllNotesAction
  | DeleteAllNotesSuccessAction
  ;
