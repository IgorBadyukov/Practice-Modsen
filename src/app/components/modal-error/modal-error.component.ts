import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ErrorService} from "../../services/error.service";

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.scss'],
})
export class ModalErrorComponent {
  @Input() errorMessage: string;
  @Output() closeModal = new EventEmitter<void>();

  constructor(public errorService: ErrorService) {
  }

  onCloseModal(event: Event) {
    if ((event.target as HTMLElement).classList.contains('modal__wrapper') ||
      (event.target as HTMLElement).classList.contains('close__btn')) {
      this.closeModal.emit();
    }

  }
}
