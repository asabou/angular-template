import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableComponent } from '../../abstracts/table/table.component';
import { Player } from './shared/player.model';
import { ToastrModule } from 'ngx-toastr';
import { ToastService } from '../../utils/toast.service';
import { PlayerSearchComponent } from './player-search/player-search.component';
import { FormsModule } from '@angular/forms';
import { AbstractDisplayComponent } from '../../abstracts/display/abstract-display.component';
import { PlayerSearchObject } from './shared/player-search.model';
import { PlayerService } from './shared/player.service';
import { MessageService } from '../../utils/message.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MyStorageService } from '../../utils/storages/my-storage.service';
import { TableItemAction } from '../../abstracts/table/shared/table-item-action.model';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, FormsModule, TableComponent, ToastrModule, PlayerSearchComponent],
  providers: [ToastService, PlayerService, MessageService],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent extends AbstractDisplayComponent<Player, PlayerSearchObject, PlayerService> {
 
  constructor(
    playerService: PlayerService,
    messageService: MessageService,
    matDialog: MatDialog,
    activeRoute: ActivatedRoute,
    router: Router,
    toast: ToastService,
    storage: MyStorageService
    ) {
      super(playerService, messageService, matDialog, activeRoute, router, toast, storage);
    }

  override getTableId(): string { return "players"; }

  override getDisplayActions(): string[]  {
    return ["delete", "save", "add"]
  }

  override openSaveDialog(tia: TableItemAction<Player>): void {
    console.log(tia);
  }
}
