export abstract class AbstractSearchObject {
    constructor() {
        this.resetFields();
    }

    abstract resetFields(): void;
}