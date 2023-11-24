import { AbstractBaseEntity } from "../../model/abstract-base-entity.model";

export class TableItemAction<T extends AbstractBaseEntity> {
    isAdd: boolean = true;
    item!: T;
    mandatories!: string[];
    identifiers!: string[];
}