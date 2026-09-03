import { signal } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import {
  AUTH_API_URL,
  CONTACT_MESSAGE_API_URL,
  TASK_API_URL,
} from './core/config/api.config';
import { AuthFacade } from './features/auth/data-access/auth-facade.service';
import { TaskApiService } from './features/tasks/data-access/task-api.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideHttpClient(),
        { provide: AUTH_API_URL, useValue: '/api/auth' },
        { provide: CONTACT_MESSAGE_API_URL, useValue: '/api/contact-messages' },
        { provide: TASK_API_URL, useValue: '/api/tasks' },
        {
          provide: AuthFacade,
          useValue: {
            isAuthenticated: signal(true),
            loading: signal(false),
            errorMessage: signal(''),
            login: () => undefined,
            register: () => undefined,
            logout: () => undefined,
          },
        },
        {
          provide: TaskApiService,
          useValue: {
            findAll: () => of([]),
          },
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render task manager title', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const accessButton = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('button'),
    ).find((button) => button.textContent?.includes('Acessar sistema'));

    accessButton?.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Gerenciador de tarefas');
  });
});
