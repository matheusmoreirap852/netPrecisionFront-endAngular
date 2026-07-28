import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateTaskRequest } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  readonly saving = input.required<boolean>();
  readonly title = signal('');
  readonly description = signal('');
  readonly createTask = output<CreateTaskRequest>();

  submit(): void {
    this.createTask.emit({
      title: this.title(),
      description: this.description(),
    });

    this.title.set('');
    this.description.set('');
  }
}
