import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractBaseEntity } from '../model/abstract-base-entity.model';
import { AbstractSearchObject } from '../model/abstract-search.model';
import { AbstractComponent } from '../model/abstract-component.model';
import { AbstractService } from '../model/abstract-service.model';
import { MessageService } from '../../utils/services/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MyStorageService } from '../../utils/storages/my-storage.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: '',
})
export abstract class AbstractSearchComponent<T extends AbstractBaseEntity, S extends AbstractSearchObject>
  extends AbstractComponent {

  searchObj!: S;

  @Output() searchStart: EventEmitter<S> = new EventEmitter();
  @Output() notify: EventEmitter<T[]> = new EventEmitter();

  constructor(
    public service: AbstractService<T, S>,
    public router: Router,
    public activeRoute: ActivatedRoute,
    messageService: MessageService,
    translateService: TranslateService,
    storageService: MyStorageService
  ) {
    super(messageService, translateService, storageService);
    this.createSearchObject();
  }

  abstract createSearchObject(): void;

  subscribeQueryParams() {
    const params = this.activeRoute.snapshot.queryParams;
    this.handleQueryParams(params);
  }

  handleQueryParams(params: any) {
    if (!!params) {
      Object.assign(this.searchObj, params);
      this.searchEntity();
    }
  }

  clear(): void {
    this.searchObj.resetFields();
  }

  search(): void {
    const queryParams: any = {};
    for (const [key, value] of Object.entries(this.searchObj)) {
      if (!!value) {
        queryParams[key] = value;
      }
    }
    this.router.navigate([], {
      queryParams: queryParams,
      replaceUrl: true
    });
    this.searchEntity();
  }

  override searchEntity() {
    this.searchStart.emit(this.searchObj);
    this.service.search(this.searchObj).subscribe(searchResult => {
      this.notify.emit(searchResult);
    });
  }
}
