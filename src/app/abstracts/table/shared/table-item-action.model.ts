import { AbstractBaseEntity } from "../../model/abstract-base-entity.model";
import { TableColumn } from "./table-column.model";

export class TableItemAction<T extends AbstractBaseEntity> {
    isAdd: boolean = false;
    item!: T;
    mandatories!: string[];
    identifiers!: string[];
    column!: TableColumn;
}