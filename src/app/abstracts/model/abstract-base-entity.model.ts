export abstract class AbstractBaseEntity {
    abstract trim(): void;

    abstract reset(): void;

    abstract getEntityName(): string;
}