import { computed, Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { CreateTaskRequest, Task } from '../models/task.model';
import { TaskApiService } from './task-api.service';

@Injectable({
  providedIn: 'root',
})
export class TaskFacade {
  readonly tasks = signal<Task[]>([]);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly errorMessage = signal('');

  readonly totalTasks = computed(() => this.tasks().length);
  readonly completedTasks = computed(
    () => this.tasks().filter((task) => task.completed).length,
  );
  readonly pendingTasks = computed(
    () => this.totalTasks() - this.completedTasks(),
  );

  constructor(private readonly taskApiService: TaskApiService) {}

  loadTasks(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.taskApiService
      .findAll()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (tasks) => this.tasks.set(tasks),
        error: () =>
          this.errorMessage.set(
            'Nao foi possivel carregar as tarefas. Confira se a API esta rodando.',
          ),
      });
  }

  createTask(request: CreateTaskRequest): void {
    const title = request.title.trim();
    const description = request.description.trim();

    if (title.length < 3) {
      this.errorMessage.set('Informe um titulo com pelo menos 3 caracteres.');
      return;
    }

    this.saving.set(true);
    this.errorMessage.set('');

    this.taskApiService
      .create({ title, description })
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe({
        next: (createdTask) => {
          this.tasks.update((tasks) => [createdTask, ...tasks]);
        },
        error: () => this.errorMessage.set('Nao foi possivel criar a tarefa.'),
      });
  }

  toggleStatus(task: Task): void {
    this.taskApiService
      .updateStatus(task.id, { completed: !task.completed })
      .subscribe({
        next: (updatedTask) =>
          this.tasks.update((tasks) =>
            tasks.map((currentTask) =>
              currentTask.id === updatedTask.id ? updatedTask : currentTask,
            ),
          ),
        error: () =>
          this.errorMessage.set('Nao foi possivel atualizar o status da tarefa.'),
      });
  }

  deleteTask(task: Task): void {
    this.taskApiService.delete(task.id).subscribe({
      next: () =>
        this.tasks.update((tasks) =>
          tasks.filter((currentTask) => currentTask.id !== task.id),
        ),
      error: () => this.errorMessage.set('Nao foi possivel excluir a tarefa.'),
    });
  }
}
