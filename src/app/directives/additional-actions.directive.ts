import { Directive, TemplateRef } from '@angular/core';
import { TableComponent } from '../abstracts/table/table.component';

@Directive({
  selector: '[appAdditionalActions]',
  standalone: true
})
export class AdditionalActionsDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private table: TableComponent
  ) {
    this.table.additionalActions = templateRef;
  }

}
