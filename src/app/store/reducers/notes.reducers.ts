import { Notes } from "./../../models/notes.model";
import { NotesActionTypes, NotesAction } from "./../actions/notes.actions";

const initialState: Array<Notes> = [
  {
    id: "1",
    notesText: "New Note",
    timeStamp: new Date().toLocaleString(),
  },
];

export function NotesReducer(
  state: Array<Notes> = initialState,
  action: NotesAction
): Notes[] {
  switch (action.type) {
    case NotesActionTypes.ADD_NOTES:
      return [...state, action.payload];
    case NotesActionTypes.ADD_NOTES_SUCCESS:
      return [...state, action.payload];

    case NotesActionTypes.LOAD_NOTES_ACTION:
      return [...state];

    case NotesActionTypes.LOAD_NOTES_SUCCESS:
      return [...action.payload];

    case NotesActionTypes.DELETE_ALL_NOTES_ACTION:
      return state;

    case NotesActionTypes.DELETE_ALL_NOTES_SUCCESS:
      return state;

    case NotesActionTypes.DELETE_NOTE_ACTION ||
      NotesActionTypes.DELETE_ALL_NOTES_SUCCESS:
      return state;

    case NotesActionTypes.TYPING_NOTES:
      return [action.payload];
    default:
      return state;
  }
}
