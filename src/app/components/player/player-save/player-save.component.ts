import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractSaveComponent } from '../../../abstracts/save/abstract-save.component';
import { PlayerSearchObject } from '../shared/player-search.model';
import { PlayerService } from '../shared/player.service';
import { Player } from '../shared/player.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from '../../../utils/services/message.service';
import { TranslateService } from '@ngx-translate/core';
import { MyStorageService } from '../../../utils/storages/my-storage.service';
import { ToastService } from '../../../utils/services/toast.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxTranslateModule } from '../../../modules/ngx-translate/ngx-translate.module';

@Component({
  selector: 'app-player-save',
  standalone: true,
  imports: [CommonModule, DragDropModule, NgxTranslateModule],
  templateUrl: './player-save.component.html',
  styleUrl: './player-save.component.scss'
})
export class PlayerSaveComponent extends AbstractSaveComponent<Player, PlayerSearchObject, PlayerService> {

  constructor(
    playerService: PlayerService,
    toastService: ToastService,
    dialogRef: MatDialogRef<PlayerSaveComponent>,
    messageService: MessageService,
    translate: TranslateService,
    storageService: MyStorageService) {
      super(playerService, toastService, dialogRef, messageService, translate, storageService);
    }

}
