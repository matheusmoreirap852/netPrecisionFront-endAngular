import { Component, OnInit } from '@angular/core';
import { CreateTaskRequest } from '../../models/task.model';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { TaskSummaryComponent } from '../../components/task-summary/task-summary.component';
import { TaskFacade } from '../../data-access/task-facade.service';

@Component({
  selector: 'app-task-page',
  imports: [TaskFormComponent, TaskListComponent, TaskSummaryComponent],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.scss',
})
export class TaskPageComponent implements OnInit {
  constructor(readonly facade: TaskFacade) {}

  ngOnInit(): void {
    this.facade.loadTasks();
  }

  createTask(request: CreateTaskRequest): void {
    this.facade.createTask(request);
  }
}
