import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'notesTaking';
  displaySideBar: boolean = true;
  smallDevicesSize: number = 576;

  ngOnInit(): void {
    if (window.innerWidth < this.smallDevicesSize) {
      this.displaySideBar = false;
    }
  }

  onExpandBtnClick(): void {
    this.displaySideBar = !this.displaySideBar;
  }

}
