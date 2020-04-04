import { Notes } from './../../models/notes.model';
import { NotesActionTypes, TypingNotesAction } from './../actions/notes.actions';

const initialState: Array<Notes> = [
    {
        id: "1",
        notesText: "New Note",
        timeStamp: new Date().toLocaleString()
    }
];

export function NotesReducer(state: Array<Notes> = initialState, action: TypingNotesAction): Notes[] {
    switch (action.type) {
        case NotesActionTypes.TYPING_NOTES:
          return [action.payload];
        default:
          return state;
      }
}