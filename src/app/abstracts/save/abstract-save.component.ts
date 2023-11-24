import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractBaseEntity } from '../model/abstract-base-entity.model';
import { AbstractService } from '../model/abstract-service.model';
import { AbstractSearchObject } from '../model/abstract-search.model';
import { AbstractComponent } from '../model/abstract-component.model';
import { MessageService } from '../../utils/message.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: '',
})
export abstract class AbstractSaveComponent<
    T extends AbstractBaseEntity, 
    S extends AbstractSearchObject, 
    U extends AbstractService<T, S>> 
  extends AbstractComponent {

    constructor(
      @Inject(AbstractService) public service: U,
      messageService: MessageService) {

      super(messageService);
    }
}
