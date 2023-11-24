import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private subjects = new Subject<any>();

  constructor() { }

  sendMessage(message: string): void {
    this.subjects.next({text: message});
  }

  getMessages(): Observable<any> {
    return this.subjects.asObservable();
  }
}
