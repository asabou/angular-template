import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { AbstractService, SERVER_URL } from '../../../abstracts/model/abstract-service.model';
import { FIRST_NAME, LAST_NAME, SALARY } from '../../../utils/models/constants.model';
import { PlayerSearchObject } from './player-search.model';
import { Player } from './player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService extends AbstractService<Player, PlayerSearchObject> {

  constructor(http: HttpClient) {
    super(http);
  }

  override initURLs(): void {
    this.SERVICE_URL = SERVER_URL + "/player";
    this.SEARCH_URL = this.SERVICE_URL + "/search";
    this.UPDATE_URL = this.SERVICE_URL;
    this.ADD_URL = this.SERVICE_URL;
    this.DELETE_URL = this.SERVICE_URL + "/";
    this.FIND_BY_URL = this.DELETE_URL;
    this.GET_ALL_URL = this.SERVICE_URL + "/all";
  }

  override search(searchObject: PlayerSearchObject): Observable<Player[]> {
    let params: HttpParams = this.extractHttpParams(searchObject);
    //TODO: get a mock async list (for now return entire list no matter HttpParams)
    return this.list;
  }

  override update(object: Player): Observable<Player> {
    //TODO: get a mock async list
    return of(new Player(null));
  }

  override add(object: Player): Observable<Player> {
    //TODO: get a mock async list
    return of(new Player(null));
  }

  override delete(id: any): Observable<any> {
    //TODO: get a mock async list
    this.list = this.list.pipe(map(players => players.filter(player => Number(player.id) !== Number(id))));
    return of({});
  }

  override find(id: any): Observable<Player> {
    //TODO: get a mock async list
    return of(new Player(null));
  }

  override getAll(): Observable<Player[]> {
    //TODO: get a mock async list
    return of([new Player(null)]);
  }

  override extractHttpParams(searchObject: PlayerSearchObject): HttpParams {
    let params = new HttpParams();
    if (!!searchObject.firstName) {
      params = params.append(FIRST_NAME, searchObject.firstName);
    }
    if (!!searchObject.lastName) {
      params = params.append(LAST_NAME, searchObject.lastName);
    }
    if (!!searchObject.salary) {
      params = params.append(SALARY, searchObject.salary);
    }
    return params;
  }

  private list: Observable<Player[]> = of([
    new Player({ id: 1, firstName: 'Alex', lastName: 'Sabou', birthDate: new Date().getDay(), nationality: 'romanian', retired: false, salary: '100' }),
    new Player({ id: 2, firstName: 'Alex1', lastName: 'Sabou1', birthDate: new Date().getDay(), nationality: 'romanian', retired: false, salary: '101' }),
    new Player({ id: 3, firstName: 'Alex2', lastName: 'Sabou1', birthDate: new Date().getDay(), nationality: 'romanian', retired: false, salary: '103' }),
    new Player({ id: 4, firstName: 'Alex3', lastName: 'Sabou2', birthDate: new Date().getDay(), nationality: 'romanian', retired: false, salary: '104' }),
    new Player({ id: 5, firstName: 'Alex4', lastName: 'Sabou3', birthDate: new Date().getDay(), nationality: 'romanian', retired: false, salary: '102' }),
    new Player({ id: 6, firstName: 'Alex5', lastName: 'Sabou3', birthDate: new Date().getDay(), nationality: 'romanian', retired: false, salary: '102' }),
    new Player({ id: 7, firstName: 'Alex6', lastName: 'Sabou3', birthDate: new Date().getDay(), nationality: 'romanian', retired: false, salary: '102' }),
    new Player({ id: 8, firstName: 'Alex7', lastName: 'Sabou3', birthDate: new Date().getDay(), nationality: 'romanian', retired: false, salary: '102' })
  ]);
}
