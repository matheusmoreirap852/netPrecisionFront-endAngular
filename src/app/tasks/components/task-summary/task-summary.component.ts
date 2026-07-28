import { Component, input } from '@angular/core';

@Component({
  selector: 'app-task-summary',
  templateUrl: './task-summary.component.html',
  styleUrl: './task-summary.component.css',
})
export class TaskSummaryComponent {
  readonly total = input.required<number>();
  readonly pending = input.required<number>();
  readonly completed = input.required<number>();
}
