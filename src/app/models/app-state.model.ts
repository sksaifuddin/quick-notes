import { Notes } from './notes.model';

export interface AppState {
    readonly notesState: Array<Notes>
}