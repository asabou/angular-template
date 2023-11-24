import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractSearchComponent } from '../../../abstracts/search/abtract-search.component';
import { PlayerSearchObject } from '../shared/player-search.model';
import { Player } from '../shared/player.model';
import { PlayerService } from '../shared/player.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../../utils/message.service';

@Component({
  selector: 'app-player-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-search.component.html',
  styleUrl: './player-search.component.scss'
})
export class PlayerSearchComponent
  extends AbstractSearchComponent<Player, PlayerSearchObject> {

  constructor(
    playerService: PlayerService,
    messageService: MessageService,
    router: Router,
    activeRoute: ActivatedRoute
  ) {
    super(playerService, messageService, router, activeRoute);
  }

  override createSearchObject(): void {
    this.searchObj = new PlayerSearchObject();
  }

}
