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
    const notesWithSearch: Notes[] = value.filter(
      (notes: Notes) =>
        notes.notesText.toLowerCase().search(args.toLowerCase()) !== -1
    );
    return notesWithSearch;
  }
}
