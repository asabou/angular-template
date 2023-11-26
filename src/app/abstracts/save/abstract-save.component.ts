import { Component, Inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractBaseEntity } from '../model/abstract-base-entity.model';
import { AbstractService } from '../model/abstract-service.model';
import { AbstractSearchObject } from '../model/abstract-search.model';
import { AbstractComponent } from '../model/abstract-component.model';
import { MessageService } from '../../utils/services/message.service';
import { NgxTranslateModule } from '../../modules/ngx-translate/ngx-translate.module';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { MyStorageService } from '../../utils/storages/my-storage.service';
import { TableItemAction } from '../table/shared/table-item-action.model';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ENTITY_NAME, ESCAPE } from '../../utils/models/constants.model';
import { ToastService } from '../../utils/services/toast.service';
import { ServiceUtils } from '../../utils/models/service-utils.model';

@Component({
  standalone: true,
  imports: [CommonModule, NgxTranslateModule, FormsModule],
  template: '',
})
export abstract class AbstractSaveComponent<
  T extends AbstractBaseEntity,
  S extends AbstractSearchObject,
  U extends AbstractService<T, S>>
  extends AbstractComponent {

  @Input() tableItemAction!: TableItemAction<T>;
  saveForm: FormGroup = new FormGroup({});

  constructor(
    @Inject(AbstractService) public service: U,
    public toastService: ToastService,
    public dialogRef: MatDialogRef<AbstractSaveComponent<T, S, U>>,
    messageService: MessageService,
    translate: TranslateService,
    storageService: MyStorageService
  ) {
    super(messageService, translate, storageService);
    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === ESCAPE) {
        this.cancel();
      }
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.tableItemAction) {
      console.log(this.saveForm.value);
      this.dialogRef.close({})
    }
  }

  initSaveForm(tia: any): void {
    this.tableItemAction = tia;
    for (let key of Object.keys(this.tableItemAction.item)) {
      if (key !== ENTITY_NAME) {
        if (tia.mandatories.indexOf(key) >= 0) {
          this.saveForm.addControl(key, new FormControl(tia.item[key], [Validators.required, this.formControlValueIsEmpty.bind(this)]));
        } else {
          this.saveForm.addControl(key, new FormControl(tia.item[key]));
        }
      }
    }
  }

  formControlValueIsEmpty(control: FormControl): { [s: string]: boolean } | null {
    if (ServiceUtils.isStringNullOrEmpty(control.value)) {
      return { 'inputIsEmpty': true };
    }
    return null
  }

  required(element: string): boolean {
    const formCont = this.saveForm.get(element);
    if (formCont != null) {
      return formCont.hasValidator(Validators.required);
    }
    return false;
  }
}
