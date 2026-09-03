import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthFacade } from '../../data-access/auth-facade.service';

type AuthMode = 'login' | 'register';

@Component({
  selector: 'app-auth-page',
  imports: [FormsModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
})
export class AuthPageComponent {
  readonly mode = signal<AuthMode>('login');
  readonly name = signal('');
  readonly email = signal('');
  readonly password = signal('');

  constructor(readonly authFacade: AuthFacade) {}

  selectMode(mode: AuthMode): void {
    this.mode.set(mode);
    this.authFacade.errorMessage.set('');
  }

  submit(): void {
    if (this.mode() === 'login') {
      this.authFacade.login({
        email: this.email(),
        password: this.password(),
      });
      return;
    }

    this.authFacade.register({
      name: this.name(),
      email: this.email(),
      password: this.password(),
    });
  }
}
