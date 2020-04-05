import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Notes } from '../models/notes.model';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  /** This service contains utility functions and shared Subjects which will be used through out the application */

  selectedNoteSubject: BehaviorSubject<Notes> = new BehaviorSubject(null);

  constructor() { }

  setSelectedNote(selectedNote: Notes): void {
    this.selectedNoteSubject.next(selectedNote);
  }

  getSelectedNote(): Observable<Notes> {
    return this.selectedNoteSubject.asObservable();
  }


  /*
  * Generalised function for removing Duplicates from any array of objects.
  * Provide a property on the basis of which duplicates will be removed.
  */
  removeDuplicates<T>(inputArray: T[], duplicateProperty: string = 'id'): T[] {
    if(inputArray.length <= 1) {
      return inputArray;
    }
    return inputArray.filter(
      (item: T, index: number, arr: T[]) => 
        arr.findIndex((notes: T) => notes[duplicateProperty] === item[duplicateProperty]) === index,
    );
  }


}
