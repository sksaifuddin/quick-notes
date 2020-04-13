import { Notes } from "./../models/notes.model";
import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { filter, map, pluck, switchMap, tap } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class NotesApiService {
  constructor() {}

  /*
   * This service will act as a real API service but will be saving data in localStorage.
   */

  getAll(): Observable<Notes[]> {
    const notes: Notes[] = JSON.parse(localStorage.getItem("notes"));
    return notes ? of(notes) : of([]);
  }

  getById(id: string): Observable<Notes> {
    return this.getAll().pipe(
      map((notes: Notes[]) => {
        return notes.filter((note: Notes) => id === note.id);
      }),
      pluck("0") // There will be always array of size 1
    );
  }

  save(notes: Notes): Observable<Notes> {
    return this.getAll().pipe(
      switchMap((allNotes: Notes[]) => {
        localStorage.setItem("notes", JSON.stringify([...allNotes, notes]));
        return allNotes;
      })
    );
  }

  update(noteToUpdate: Notes): Observable<Notes[]> {
   return this.getAll().pipe(
      map((data: Notes[]) => {
        const selectedNoteIndex: number = data.indexOf(noteToUpdate);
        if(selectedNoteIndex !== -1) {
          data[selectedNoteIndex] = noteToUpdate;
        }
        return data;
      }),
      tap((filteredNotes) =>
        localStorage.setItem("notes", JSON.stringify(filteredNotes))
      )
    )
  }

  deleteAll(): Observable<[]> {
    localStorage.setItem("notes", JSON.stringify([]));
    return of([]);
  }

  deleteById(id: string): Observable<Notes[]> {
   return this.getAll().pipe(
      map((notes: Notes[]) => {
        return notes.filter((note: Notes) => id !== note.id);
      }),
      tap((filteredNotes) =>
        localStorage.setItem("notes", JSON.stringify(filteredNotes))
      )
    );
  }
}
