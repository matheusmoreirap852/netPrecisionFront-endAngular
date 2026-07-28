import { Component, input, output } from '@angular/core';
import { Task } from '../../../core/models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  readonly tasks = input.required<Task[]>();
  readonly loading = input.required<boolean>();
  readonly toggleStatus = output<Task>();
  readonly deleteTask = output<Task>();
}
