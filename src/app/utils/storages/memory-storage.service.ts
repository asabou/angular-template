export class MemoryStorageService implements Storage {
  private static data: { [key: string]: string } = {};

  get length(): number {
    return Object.keys(MemoryStorageService.data).length;
  }

  clear(): void {
    MemoryStorageService.data = {};
  }

  getItem(key: string): string | null {
    return key in MemoryStorageService.data ? MemoryStorageService.data[key] : null;
  }

  key(index: number): string | null {
    const keys = Object.keys(MemoryStorageService.data);
    return index >= 0 && keys.length < index ? keys[index] : null;
  }

  removeItem(key: string): void {
    delete MemoryStorageService.data[key];
  }

  setItem(key: string, value: string): void {
    MemoryStorageService.data[key] = value;
    console.log(value);
  }
}
