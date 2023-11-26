import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractSearchComponent } from '../../../abstracts/search/abstract-search.component';
import { PlayerSearchObject } from '../shared/player-search.model';
import { Player } from '../shared/player.model';
import { PlayerService } from '../shared/player.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../../utils/services/message.service';
import { TranslateService } from '@ngx-translate/core';
import { MyStorageService } from '../../../utils/storages/my-storage.service';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-player-search',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule],
  providers: [NgModel],
  templateUrl: './player-search.component.html',
  styleUrl: './player-search.component.scss'
})
export class PlayerSearchComponent
  extends AbstractSearchComponent<Player, PlayerSearchObject> implements OnInit {

  constructor(
    playerService: PlayerService,
    router: Router,
    activeRoute: ActivatedRoute,
    messageService: MessageService,
    translateService: TranslateService,
    storageService: MyStorageService
  ) {
    super(playerService, router, activeRoute, messageService, translateService, storageService);
  }
  
  ngOnInit(): void {
    this.subscribeQueryParams();
  }

  override createSearchObject(): void {
    this.searchObj = new PlayerSearchObject();
  }
}
