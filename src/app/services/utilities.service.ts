import { Injectable } from '@angular/core';
import { Notes } from '../models/notes.model';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  /** This service contains utility functions and shared Subjects which will be used through out the application */

  constructor() { }

  removeDuplicates<T>(inputArray: T[]): T[] {
    if(inputArray.length <= 1) {
      return inputArray;
    }
    return inputArray.filter(
      (item: T, index: number, arr: T[]) => 
        arr.findIndex((notes: T) => notes['id'] === item['id']) === index,
    );
  }


}
