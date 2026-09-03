import { Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs';
import {
  AuthSession,
  AuthUser,
  LoginRequest,
  RegisterRequest,
} from '../models/auth.model';
import { AuthApiService } from './auth-api.service';

const AUTH_TOKEN_KEY = 'task-manager.auth.token';
const AUTH_USER_KEY = 'task-manager.auth.user';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  readonly token = signal<string | null>(localStorage.getItem(AUTH_TOKEN_KEY));
  readonly user = signal<AuthUser | null>(this.restoreUser());
  readonly loading = signal(false);
  readonly errorMessage = signal('');

  readonly isAuthenticated = signal(Boolean(this.token()));

  constructor(private readonly authApiService: AuthApiService) {}

  login(request: LoginRequest): void {
    const email = request.email.trim().toLowerCase();
    const password = request.password.trim();

    if (!email || !password) {
      this.errorMessage.set('Informe email e senha para entrar.');
      return;
    }

    this.submit(this.authApiService.login({ email, password }));
  }

  register(request: RegisterRequest): void {
    const name = request.name.trim();
    const email = request.email.trim().toLowerCase();
    const password = request.password.trim();

    if (name.length < 2) {
      this.errorMessage.set('Informe seu nome.');
      return;
    }

    if (!email || password.length < 6) {
      this.errorMessage.set('Informe um email válido e senha com pelo menos 6 caracteres.');
      return;
    }

    this.submit(this.authApiService.register({ name, email, password }));
  }

  logout(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    this.token.set(null);
    this.user.set(null);
    this.isAuthenticated.set(false);
  }

  private submit(request$: ReturnType<AuthApiService['login']>): void {
    this.loading.set(true);
    this.errorMessage.set('');

    request$
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (session) => this.saveSession(session),
        error: () =>
          this.errorMessage.set(
            'Não foi possível autenticar. Confira os dados e tente novamente.',
          ),
      });
  }

  private saveSession(session: AuthSession): void {
    localStorage.setItem(AUTH_TOKEN_KEY, session.token);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(session.user));
    this.token.set(session.token);
    this.user.set(session.user);
    this.isAuthenticated.set(true);
  }

  private restoreUser(): AuthUser | null {
    const storedUser = localStorage.getItem(AUTH_USER_KEY);

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser) as AuthUser;
    } catch {
      localStorage.removeItem(AUTH_USER_KEY);
      return null;
    }
  }
}
