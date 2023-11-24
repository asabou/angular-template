import { HttpClient, HttpParams } from "@angular/common/http";
import { AbstractBaseEntity } from "./abstract-base-entity.model";
import { AbstractSearchObject } from "./abstract-search.model";
import { Observable } from "rxjs";
import { EMPTY_STRING } from "../../utils/constants.model";

export const SERVER_URL = "rest-server-url"; 

export abstract class AbstractService<T extends AbstractBaseEntity, S extends AbstractSearchObject> {
    SERVICE_URL: string = EMPTY_STRING;
    SEARCH_URL: string = EMPTY_STRING;
    UPDATE_URL: string = EMPTY_STRING;
    ADD_URL: string = EMPTY_STRING;
    DELETE_URL: string = EMPTY_STRING;
    FIND_BY_URL: string = EMPTY_STRING;
    GET_ALL_URL: string = EMPTY_STRING;

    constructor(private http: HttpClient) {

    }

    abstract initURLs(): void;

    abstract search(searchObject: S): Observable<T[]>;

    abstract update(object: T): Observable<T>;

    abstract add(object: T): Observable<T>;

    abstract delete(id: any): Observable<any>;

    abstract find(id: any): Observable<T>;

    abstract getAll(): Observable<T[]>;

    abstract extractHttpParams(searchObject: S): HttpParams;
}