import { Component, input, output } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
  readonly task = input.required<Task>();
  readonly toggleStatus = output<Task>();
  readonly deleteTask = output<Task>();
}
