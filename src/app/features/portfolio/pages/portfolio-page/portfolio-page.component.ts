import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactMessageFacade } from '../../data-access/contact-message-facade.service';

@Component({
  selector: 'app-portfolio-page',
  imports: [FormsModule],
  templateUrl: './portfolio-page.component.html',
  styleUrl: './portfolio-page.component.scss',
})
export class PortfolioPageComponent {
  readonly accessSystem = output<void>();
  readonly name = signal('');
  readonly email = signal('');
  readonly subject = signal('');
  readonly message = signal('');

  constructor(readonly contactMessageFacade: ContactMessageFacade) {}

  sendMessage(): void {
    this.contactMessageFacade.send(
      {
        name: this.name(),
        email: this.email(),
        subject: this.subject(),
        message: this.message(),
      },
      () => this.clearForm(),
    );
  }

  private clearForm(): void {
    this.name.set('');
    this.email.set('');
    this.subject.set('');
    this.message.set('');
  }
}
