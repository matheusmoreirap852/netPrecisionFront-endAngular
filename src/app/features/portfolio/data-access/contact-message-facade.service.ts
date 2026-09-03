import { Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { ContactMessageRequest } from '../models/contact-message.model';
import { ContactMessageApiService } from './contact-message-api.service';

@Injectable({
  providedIn: 'root',
})
export class ContactMessageFacade {
  readonly sending = signal(false);
  readonly successMessage = signal('');
  readonly errorMessage = signal('');

  constructor(private readonly contactMessageApiService: ContactMessageApiService) {}

  send(request: ContactMessageRequest, onSuccess: () => void): void {
    const name = request.name.trim();
    const email = request.email.trim().toLowerCase();
    const subject = request.subject.trim();
    const message = request.message.trim();

    if (!name || !email || !subject || message.length < 10) {
      this.errorMessage.set('Preencha os campos e escreva uma mensagem com pelo menos 10 caracteres.');
      this.successMessage.set('');
      return;
    }

    this.sending.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    this.contactMessageApiService
      .create({ name, email, subject, message })
      .pipe(finalize(() => this.sending.set(false)))
      .subscribe({
        next: () => {
          this.successMessage.set('Mensagem enviada. Obrigado pelo contato.');
          onSuccess();
        },
        error: () =>
          this.errorMessage.set(
            'Nao foi possivel enviar agora. Tente novamente em alguns instantes.',
          ),
      });
  }
}
