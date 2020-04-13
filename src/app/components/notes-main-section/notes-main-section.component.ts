import { filter, debounce, debounceTime, tap } from "rxjs/operators";
import { UtilitiesService } from "./../../services/utilities.service";
import { NotesApiService } from "./../../services/notes-api.service";
import { Notes } from "./../../models/notes.model";
import {
  TypingNotesAction,
  AddNotesAction,
} from "./../../store/actions/notes.actions";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { AppState } from "src/app/models/app-state.model";
import { Store } from "@ngrx/store";
import { v4 as uuid } from "uuid";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-notes-main-section",
  templateUrl: "./notes-main-section.component.html",
  styleUrls: ["./notes-main-section.component.scss"],
})
export class NotesMainSectionComponent implements OnInit {
  form: FormGroup;
  disabledAddBtn: boolean = true;
  newNotesSubject: BehaviorSubject<Notes> = new BehaviorSubject(null);
  currentTimeStamp: string = new Date().toLocaleString();

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private utilityService: UtilitiesService,
    private notesApi:NotesApiService
  ) {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      notesText: "",
    });
  }

  ngOnInit(): void {
    this.setNotesTyping();
    this.utilityService
      .getSelectedNote()
      .pipe(
        tap((data: Notes) => {
          if(!data) {
            this.resertFormAction();
            this.utilityService.setNewNotes(null);
          }
        }),
        filter(Boolean)
        )
      .subscribe((data: Notes) => {
        this.form.get("notesText").setValue(data.notesText);
        this.currentTimeStamp = data.timeStamp;
        this.form.get("notesText").disable()
      });
      this.notesApi.getAll().subscribe((data) => console.log('alll', data));
  }

  setNotesTyping(): void {
    this.form
      .get("notesText")
      .valueChanges.pipe(
        debounceTime(100),
        filter(Boolean),
        )
      .subscribe((data: string) => {
        const newNotes: Notes = {
          id: uuid(),
          notesText: data,
          timeStamp: new Date().toLocaleString(),
        };
        this.disabledAddBtn = false;
        this.utilityService.setNewNotes(newNotes);
      });
  }

  addNotes(): void {
    const newNotes: Notes = this.utilityService.getNewNotesValue();
    this.store.dispatch(new AddNotesAction(newNotes));
    this.resertFormAction();
  }

  resertFormAction(): void {
    this.disabledAddBtn = true;
    this.form.get("notesText").reset();
    this.form.get("notesText").enable();
    this.utilityService.resetNewCardSubject.next(true);
  }
}
