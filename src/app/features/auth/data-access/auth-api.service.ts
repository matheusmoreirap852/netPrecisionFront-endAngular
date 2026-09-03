import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTH_API_URL } from '../../../core/config/api.config';
import { AuthSession, LoginRequest, RegisterRequest } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(
    private readonly http: HttpClient,
    @Inject(AUTH_API_URL) private readonly apiUrl: string,
  ) {}

  login(request: LoginRequest): Observable<AuthSession> {
    return this.http.post<AuthSession>(`${this.apiUrl}/login`, request);
  }

  register(request: RegisterRequest): Observable<AuthSession> {
    return this.http.post<AuthSession>(`${this.apiUrl}/register`, request);
  }
}
