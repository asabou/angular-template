import { Platform } from '@angular/cdk/platform';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { MemoryStorageService } from './memory-storage.service';
import { HttpClient } from '@angular/common/http';
import { LANG } from '../models/constants.model';
import { TableColumn } from '../../abstracts/table/shared/table-column.model';

@Injectable({
  providedIn: 'root'
})
export class MyStorageService {

  private storage!: Storage;

  constructor(
    private platform: Platform,
    private http: HttpClient
  ) {
    if (platform.isBrowser) {
      this.storage = new LocalStorageService(platform); //new SessionStorageService(platform);
    } else {
      this.storage = new MemoryStorageService();
    }
   }

  private jsonParse(data: any) {
    return JSON.parse(data);
  }

  private jsonStringify(data: Object) {
    return JSON.stringify(data);
  }

  public setLanguage(language: string): void {
    this.storage.setItem(LANG, language);
  }

  public getLanguage(): string {
    return this.storage.getItem(LANG) || "ro";
  }

  public setTableData(tableId: any, tableData: any): void {
    this.storage.setItem(tableId, this.jsonStringify(tableData));
  }

  public getTableData(tableId: any): any {
    return this.jsonParse(this.storage.getItem(tableId));
  }

  public initTableDataOnLocalStorage(): void {
    this.http.get('assets/configs/columns.json', {
      responseType: 'json'
    }).subscribe(data => {
      //keys are actually the tableIds
      let table: any = data;
      let keys: any = Object.keys(table);
      for (let key of keys) {
        let item = this.storage.getItem(key);
        if (!item) {
          this.setTableData(key, table[key]);
        }
      }
    });
  }
}
