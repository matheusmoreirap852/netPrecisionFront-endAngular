import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONTACT_MESSAGE_API_URL } from '../../../core/config/api.config';
import {
  ContactMessageRequest,
  ContactMessageResponse,
} from '../models/contact-message.model';

@Injectable({
  providedIn: 'root',
})
export class ContactMessageApiService {
  constructor(
    private readonly http: HttpClient,
    @Inject(CONTACT_MESSAGE_API_URL) private readonly apiUrl: string,
  ) {}

  create(request: ContactMessageRequest): Observable<ContactMessageResponse> {
    return this.http.post<ContactMessageResponse>(this.apiUrl, request);
  }
}
