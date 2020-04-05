import { NotesApiService } from './../../services/notes-api.service';
import { Notes } from "./../../models/notes.model";
import { TypingNotesAction, AddNotesAction } from "./../../store/actions/notes.actions";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { AppState } from "src/app/models/app-state.model";
import { Store } from "@ngrx/store";
import { v4 as uuid } from "uuid";
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: "app-notes-main-section",
  templateUrl: "./notes-main-section.component.html",
  styleUrls: ["./notes-main-section.component.scss"],
})
export class NotesMainSectionComponent implements OnInit {
  form: FormGroup;
  newNotesSubject: BehaviorSubject<Notes> = new BehaviorSubject(null);

  constructor(private fb: FormBuilder, private store: Store<AppState>, private notesAPi: NotesApiService) {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      notesText: "",
    });
  }

  ngOnInit(): void {
    this.setNotesTyping();
  }

  setNotesTyping(): void {
    this.form.get("notesText").valueChanges.subscribe((data: string) => {
      const newNotes: Notes = {
        id: uuid(),
        notesText: data,
        timeStamp: new Date().toLocaleString(),
      };
      this.newNotesSubject.next(newNotes);
    });
  }

  addNotes(): void {
    const newNotes: Notes = this.newNotesSubject.getValue();
    this.store.dispatch(new AddNotesAction(newNotes));
  }


}
