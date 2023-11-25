import { Directive, TemplateRef } from '@angular/core';
import { TableComponent } from '../abstracts/table/table.component';

@Directive({
  selector: '[appAdditionalHtml]',
  standalone: true
})
export class AdditionalHtmlDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private table: TableComponent
  ) {
    this.table.additionalHtml = templateRef;
  }
}
