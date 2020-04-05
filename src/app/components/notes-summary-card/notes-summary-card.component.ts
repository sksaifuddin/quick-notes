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

  constructor() { }

  ngOnInit(): void {
  }
}
