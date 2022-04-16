import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'mpa-hub-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];
  background: ThemePalette = undefined;

  toggleBackground() {
    this.background = this.background ? undefined : 'primary';
  }

  addLink() {
    this.links.push(`Link ${this.links.length + 1}`);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
