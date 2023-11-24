import { Platform } from '@angular/cdk/platform';
import { MemoryStorageService } from './memory-storage.service';

export class LocalStorageService implements Storage {
  private storage!: Storage;

  constructor(private platform: Platform) {
    if (platform.isBrowser) {
      this.storage = window.localStorage;
    } else {
      this.storage = new MemoryStorageService();
    }
  }
  [name: string]: any;
  length!: number;

  clear(): void {
    this.storage.clear();
  }

  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  key(index: number): string | null {
    return this.storage.key(index);
  }

  removeItem(key: string): void {
    return this.storage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    return this.storage.setItem(key, value);
  }
}
