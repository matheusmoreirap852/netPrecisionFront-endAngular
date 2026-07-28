import { InjectionToken } from '@angular/core';
import { environment } from '../../../environments/environment';

export const TASK_API_URL = new InjectionToken<string>('TASK_API_URL');

export const taskApiUrlProvider = {
  provide: TASK_API_URL,
  useValue: environment.taskApiUrl,
};
