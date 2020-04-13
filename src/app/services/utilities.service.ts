import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Notes } from '../models/notes.model';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  /** This service contains utility functions and shared Subjects which will be used through out the application */

  selectedNoteSubject: BehaviorSubject<Notes> = new BehaviorSubject(null);
  newNotesSubject: BehaviorSubject<Notes> = new BehaviorSubject(null);
  resetNewCardSubject: BehaviorSubject<boolean> = new BehaviorSubject(null);

  constructor() { }

  /*
  * setter and getter functions used when user clicks on one of the notes card from side bar.
  */

  setSelectedNote(selectedNote: Notes): void {
    this.selectedNoteSubject.next(selectedNote);
  }

  getSelectedNote(): Observable<Notes> {
    return this.selectedNoteSubject.asObservable();
  }


  /*
  * setter and getter functions used when user starts typing the notes in main notes section.
  */  
  setNewNotes(notes: Notes): void {
    this.newNotesSubject.next(notes);
  }

  getNewNotesObservable(): Observable<Notes> {
    return this.newNotesSubject.asObservable();
  }

  getNewNotesValue(): Notes {
    return this.newNotesSubject.getValue();
  }


  /*
  * Generalised function for removing Duplicates from any array of objects.
  * Provide a property name on the basis of which duplicates will be removed.
  * Defualt property will be Id.
  */
  removeDuplicates<T>(inputArray: T[], duplicateProperty: string = 'id'): T[] {
    if(inputArray.length === 0) {
      return inputArray;
    }
    return inputArray.filter(
      (item: T, index: number, arr: T[]) => 
        arr.findIndex((notes: T) => notes[duplicateProperty] === item[duplicateProperty]) === index,
    );
  }


}
