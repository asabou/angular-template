import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableComponent } from '../../abstracts/table/table.component';
import { Player } from './shared/player.model';
import { ToastrModule } from 'ngx-toastr';
import { PlayerSearchComponent } from './player-search/player-search.component';
import { FormsModule } from '@angular/forms';
import { AbstractDisplayComponent } from '../../abstracts/display/abstract-display.component';
import { PlayerSearchObject } from './shared/player-search.model';
import { PlayerService } from './shared/player.service';
import { MessageService } from '../../utils/services/message.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MyStorageService } from '../../utils/storages/my-storage.service';
import { TableItemAction } from '../../abstracts/table/shared/table-item-action.model';
import { TranslateService } from '@ngx-translate/core';
import { NgxTranslateModule } from '../../modules/ngx-translate/ngx-translate.module';
import { PlayerSaveComponent } from './player-save/player-save.component';
import { DialogUtils } from '../../utils/models/dialog-utils.model';
import { RELOAD_SEARCH } from '../../utils/models/constants.model';
import { ToastService } from '../../utils/services/toast.service';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, FormsModule, TableComponent, ToastrModule, PlayerSearchComponent, NgxTranslateModule],
  providers: [ToastService, PlayerService, MessageService, TranslateService],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent extends AbstractDisplayComponent<Player, PlayerSearchObject, PlayerService> {
  saveDialogRef!: MatDialogRef<PlayerSaveComponent>;

  constructor(
    playerService: PlayerService,
    toast: ToastService,
    messageService: MessageService,
    translateService: TranslateService,
    storageService: MyStorageService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private storage: MyStorageService,
    private matDialog: MatDialog
    ) {
      super(playerService, toast, messageService, translateService, storageService);
    }

  override getTableId(): string { return "players"; }

  override getDisplayActions(): string[]  {
    return ["delete", "save", "add", "sort", "cancel-sort", "download", "upload", "filter"];
  }

  override openAddForm(tia: TableItemAction<Player>): void {
    tia.item = new Player(null);
    this.openSaveDialog(tia);
  }

  override openEditForm(tia: TableItemAction<Player>): void {
    this.openSaveDialog(tia);
  }

  //in this simple case we can use the same form for add and edit
  //in another situations we can have perhaps another page with the details of Player
  //in this situation (which is very simple) we will use the same dialog for edit and add
  private openSaveDialog(tia: TableItemAction<Player>): void {
    this.saveDialogRef = this.matDialog.open(
      PlayerSaveComponent,
      DialogUtils.createDefaultPanelDialogConfig(500, "dialog")
    );
    this.saveDialogRef.componentInstance.initSaveForm(tia);
    this.saveDialogRef.afterClosed().subscribe(result => {
      if (result) {
        //TODO: reload search could be expensive
        //      for add:  inserting at the end might solve the loading data into table
        //                what if we want to insert data in a sorted list?
        //      for edit: finding the index of edited object from objList could be a solution to avoid reload search
        //                but again, what if we want data sorted by a criteria?!
        //      for now reload search might be the best solution
        this.messageService.sendMessage(RELOAD_SEARCH);
      }
    });
  }

  onSort(players: any): void {
    //TODO: for now, consider logging the new sorted list
    console.log(players);
  }
}
