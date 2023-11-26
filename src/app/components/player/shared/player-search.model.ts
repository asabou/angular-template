import { AbstractSearchObject } from "../../../abstracts/model/abstract-search.model";
import { EMPTY_STRING } from "../../../utils/models/constants.model";

export class PlayerSearchObject extends AbstractSearchObject {

    firstName!: string;
    lastName!: string;
    salary!: string;
    retired!: boolean;
    
    override resetFields(): void {
        this.firstName = EMPTY_STRING;
        this.lastName = EMPTY_STRING;
        this.salary = EMPTY_STRING;
        this.retired = false;
    }
    
}