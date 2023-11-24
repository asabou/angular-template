import { Platform } from '@angular/cdk/platform';
import { MemoryStorageService } from './memory-storage.service';

export class SessionStorageService implements Storage {
  private storage!: Storage;

  constructor(
    private platform: Platform
  ) {
    if (platform.isBrowser) {
      this.storage = window.sessionStorage;
    } else {
      this.storage = new MemoryStorageService();
    }
  }

  get length(): number {
    return this.storage.length;
  }

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
    this.storage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    this.storage.setItem(key, value);
  }
}
