import { Component, signal } from '@angular/core';
import { AuthPageComponent } from './features/auth/pages/auth-page/auth-page.component';
import { AuthFacade } from './features/auth/data-access/auth-facade.service';
import { PortfolioPageComponent } from './features/portfolio/pages/portfolio-page/portfolio-page.component';
import { TaskPageComponent } from './features/tasks/pages/task-page/task-page.component';

type AppView = 'portfolio' | 'system';

@Component({
  selector: 'app-root',
  imports: [AuthPageComponent, PortfolioPageComponent, TaskPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly currentView = signal<AppView>('portfolio');

  constructor(readonly authFacade: AuthFacade) {}

  openSystem(): void {
    this.currentView.set('system');
  }

  openPortfolio(): void {
    this.currentView.set('portfolio');
  }
}
