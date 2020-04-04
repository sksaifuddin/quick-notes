import { Notes } from './../models/notes.model';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { filter, map, pluck, switchMap, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class NotesApiService {

  constructor() { }

  /*  
  * This service will act as a real API service but will be saving data in localStorage.
  */

  getAll(): Observable<Notes[]> {
      return of(JSON.parse(localStorage.getItem('notes')));
  }

  getById(id: string): Observable<Notes> {
     return this.getAll().pipe(
        map((notes: Notes[]) => { return notes.filter((note: Notes) => id === note.id) }),
        pluck('0')
      );
  }

  save(notes: Notes[]): void {
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  saveById(notes: Notes): Observable<Notes> {
   return this.getAll().pipe(
      switchMap((allNotes: Notes[]) => { 
        localStorage.setItem('notes', JSON.stringify([...allNotes, notes]))
        return allNotes;
      }),
    )
  }

  deleteAll(): void {
    localStorage.setItem('notes', JSON.stringify([]));
  }

  deleteById(id: string): void {
    this.getAll().pipe(
      map((notes: Notes[]) => { return notes.filter((note: Notes) => id !== note.id) }),
      tap((filteredNotes) => localStorage.setItem('notes', JSON.stringify(filteredNotes)))
    );
  }

}
