import { Component } from '@angular/core';
import { TaskPageComponent } from './tasks/pages/task-page/task-page.component';

@Component({
  selector: 'app-root',
  imports: [TaskPageComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
