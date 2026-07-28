import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { environment } from '../environments/environment';
import { TASK_API_URL } from './core/tokens/api-url.token';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    {
      provide: TASK_API_URL,
      useValue: environment.taskApiUrl,
    },
  ],
};
