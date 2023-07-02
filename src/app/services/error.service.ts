import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ErrorService {
  private isOpen = new Subject<boolean>();

  private errorMessage = new Subject<string>();

  isOpen$ = this.isOpen.asObservable();

  errorMessage$ = this.errorMessage.asObservable();

  openModal(message: string): void {
    this.isOpen.next(true);
    this.errorMessage.next(message);
  }

  closeModal() {
    this.isOpen.next(false);
  }
}
