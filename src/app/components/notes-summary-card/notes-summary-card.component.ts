import { filter } from 'rxjs/operators';
import { UtilitiesService } from './../../services/utilities.service';
import { Notes } from './../../models/notes.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notes-summary-card',
  templateUrl: './notes-summary-card.component.html',
  styleUrls: ['./notes-summary-card.component.scss']
})
export class NotesSummaryCardComponent implements OnInit {

  currentTime: string = new Date().toLocaleString();

  @Input() notes: Notes;
  @Input() activeNoteId: string;
  @Input() set isNewNoteCard(isNewNote: boolean) {
    if(isNewNote) {
      this.utilityService.getNewNotesObservable()
      .pipe(filter(Boolean))
      .subscribe((notes: Notes) => {
          this.notes = notes;
      })
    }
  }

  constructor(private utilityService: UtilitiesService) { }

  ngOnInit(): void {
  }
}
