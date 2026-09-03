import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { authTokenInterceptor } from './features/auth/data-access/auth-token.interceptor';
import {
  authApiUrlProvider,
  contactMessageApiUrlProvider,
  taskApiUrlProvider,
} from './core/config/api.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([authTokenInterceptor])),
    authApiUrlProvider,
    contactMessageApiUrlProvider,
    taskApiUrlProvider,
  ],
};
