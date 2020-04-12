import { Notes } from "./../models/notes.model";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "search",
})
export class SearchPipe implements PipeTransform {
  transform(value: Notes[], args: string): any {
    if (!args) {
      return value;
    }
    const notesWithSearch: Notes[] = this.getNotesWithSearchedTxt(value, args);
    const highlightedNotes: Notes[] = this.getNotesWithHighlightedTxt(notesWithSearch, args);
    return highlightedNotes;
  }

  getNotesWithSearchedTxt(notes: Notes[], searchText: string): Notes[] {
    return notes.filter(
      (notes: Notes) =>
        notes.notesText.toLowerCase().search(searchText.toLowerCase()) !== -1
    );
  }

  getNotesWithHighlightedTxt(notesWithSearch: Notes[], searchText: string): Notes[] {
    return notesWithSearch.map((notes: Notes) => {
      // gi used to do a case insensitive search of all occurrences of a regular expression in a string.
      const re = new RegExp(searchText, 'gi');
      return {
        ...notes,
        notesText: notes.notesText.replace(re, `<span class="text-warning">${searchText}</span>` )
      }
    })
  }

}
