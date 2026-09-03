import { InjectionToken } from '@angular/core';
import { environment } from '../../../environments/environment';

export const TASK_API_URL = new InjectionToken<string>('TASK_API_URL');
export const AUTH_API_URL = new InjectionToken<string>('AUTH_API_URL');
export const CONTACT_MESSAGE_API_URL = new InjectionToken<string>('CONTACT_MESSAGE_API_URL');

export const taskApiUrlProvider = {
  provide: TASK_API_URL,
  useValue: environment.taskApiUrl,
};

export const authApiUrlProvider = {
  provide: AUTH_API_URL,
  useValue: environment.authApiUrl,
};

export const contactMessageApiUrlProvider = {
  provide: CONTACT_MESSAGE_API_URL,
  useValue: environment.contactMessageApiUrl,
};
