import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player } from './shared/player.model';
import { TableComponent } from '../../abstracts/table/table.component';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {
  list: Player[] = [
   
  ]

  constructor() {
    this.list = [
      new Player({'id': 1, 'firstName': "Sabou", "lastName": "Alexandru", "birthDate": new Date(), "nationality": "Romanian", "salary": "101", "photo": "", "retired": false}),
      new Player({'id': 2, 'firstName': "Sabou", "lastName": "Alexandru", "birthDate": new Date(), "nationality": "Romanian", "salary": "102", "photo": "", "retired": false}),
      new Player({'id': 3, 'firstName': "Sabou", "lastName": "Alexandru", "birthDate": new Date(), "nationality": "Romanian", "salary": "103", "photo": "", "retired": false}),
      new Player({'id': 4, 'firstName': "Sabou", "lastName": "Alexandru", "birthDate": new Date(), "nationality": "Romanian", "salary": "106", "photo": "", "retired": false}),
      new Player({'id': 5, 'firstName': "Sabou", "lastName": "Alexandru", "birthDate": new Date(), "nationality": "Romanian", "salary": "104", "photo": "", "retired": false}),
      new Player({'id': 6, 'firstName': "Sabou", "lastName": "Alexandru", "birthDate": new Date(), "nationality": "Romanian", "salary": "103", "photo": "", "retired": false})
    ]
  }

  getTableId(): string { return "players"; }
}
