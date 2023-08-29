import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board-header-profile',
  templateUrl: './board-header-profile.component.html',
  styleUrls: ['./board-header-profile.component.scss']
})
export class BoardHeaderProfileComponent implements OnInit {

  name: string | null = null;

  ngOnInit(): void {
    this.findName();
  }

  findName(): void {
    let name = localStorage.getItem('loggedInUser');
    if (name) {
      this.name = name;
    }
  }

}
