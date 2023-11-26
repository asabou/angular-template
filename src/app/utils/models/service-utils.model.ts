export class ServiceUtils {
    static trim(string: string): string {
        return string.trim();
    }
    
    static isStringNullOrEmpty(string: string): boolean {
        return this.isObjectNull(string) || this.trim(string) === "";
    }

    static isObjectNull(obj: any): boolean {
        return obj === undefined || obj === null;
    }
}