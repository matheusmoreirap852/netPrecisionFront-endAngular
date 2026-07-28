import { Component, input, output } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-task-list',
  imports: [TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  readonly tasks = input.required<Task[]>();
  readonly loading = input.required<boolean>();
  readonly toggleStatus = output<Task>();
  readonly deleteTask = output<Task>();
}
