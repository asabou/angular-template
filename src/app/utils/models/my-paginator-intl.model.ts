import { Component } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { TranslateService } from "@ngx-translate/core";
import { NgxTranslateModule } from "../../modules/ngx-translate/ngx-translate.module";

@Component({
    standalone: true,
    template: '',
    providers: [TranslateService],
    imports: [NgxTranslateModule]
})
export class MyPaginatorIntl extends MatPaginatorIntl {
    constructor(
        private translate: TranslateService
    ) {
        super();
        //TODO: apparently the translation does not work here, neither if we puth them in initDataSource() from table component
        this.itemsPerPageLabel = this.translate.instant("general.labels.items-per-page");
        this.firstPageLabel = this.translate.instant("general.labels.first-page");
        this.previousPageLabel = this.translate.instant("general.labels.prevoius-page");
        this.nextPageLabel = this.translate.instant("general.labels.next-page");
        this.lastPageLabel = this.translate.instant("general.labels.last-page");
    }

    override getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
            return `0 / ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} / ${length}`;
    }
}