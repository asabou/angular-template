import { AbstractBaseEntity } from "../../../abstracts/model/abstract-base-entity.model";
import { EMPTY_STRING } from "../../../utils/constants.model";

export class Player extends AbstractBaseEntity {
    id!: number;
    firstName!: string;
    lastName!: string;
    birthDate!: Date;
    nationality!: string;
    salary!: string;
    photo!: string;
    retired!: boolean;

    constructor(data: any) {
        super();
        Object.assign(this, data);
    }

    override trim(): void {
        if (!!this.firstName) this.firstName = this.firstName.trim();
        if (!!this.lastName) this.lastName = this.lastName.trim();
        if (!!this.nationality) this.nationality = this.nationality.trim();
        if (!!this.salary) this.salary = this.salary.trim();
        if (!!this.photo) this.photo = this.photo.trim();
    }

    override reset(): void {
        this.firstName = EMPTY_STRING;
        this.lastName = EMPTY_STRING;
        this.birthDate = new Date();
        this.nationality = EMPTY_STRING;
        this.salary = EMPTY_STRING;
        this.photo = EMPTY_STRING;
        this.retired = false;
    }

    override getEntityName(): string {
        return "Player";
    }
    
}