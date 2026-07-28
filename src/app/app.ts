import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { Task } from './core/models/task.model';
import { TaskService } from './core/services/task.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly taskService = inject(TaskService);

  protected readonly tasks = signal<Task[]>([]);
  protected readonly title = signal('');
  protected readonly description = signal('');
  protected readonly loading = signal(false);
  protected readonly saving = signal(false);
  protected readonly errorMessage = signal('');

  protected readonly totalTasks = computed(() => this.tasks().length);
  protected readonly completedTasks = computed(
    () => this.tasks().filter((task) => task.completed).length,
  );
  protected readonly pendingTasks = computed(
    () => this.totalTasks() - this.completedTasks(),
  );

  ngOnInit(): void {
    this.loadTasks();
  }

  protected loadTasks(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.taskService
      .findAll()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (tasks) => this.tasks.set(tasks),
        error: () =>
          this.errorMessage.set(
            'Nao foi possivel carregar as tarefas. Confira se a API esta rodando em http://localhost:8082.',
          ),
      });
  }

  protected createTask(): void {
    const title = this.title().trim();
    const description = this.description().trim();

    if (title.length < 3) {
      this.errorMessage.set('Informe um titulo com pelo menos 3 caracteres.');
      return;
    }

    this.saving.set(true);
    this.errorMessage.set('');

    this.taskService
      .create({ title, description })
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe({
        next: (createdTask) => {
          this.tasks.update((tasks) => [createdTask, ...tasks]);
          this.title.set('');
          this.description.set('');
        },
        error: () => this.errorMessage.set('Nao foi possivel criar a tarefa.'),
      });
  }

  protected toggleStatus(task: Task): void {
    this.taskService
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

  protected deleteTask(task: Task): void {
    this.taskService.delete(task.id).subscribe({
      next: () =>
        this.tasks.update((tasks) =>
          tasks.filter((currentTask) => currentTask.id !== task.id),
        ),
      error: () => this.errorMessage.set('Nao foi possivel excluir a tarefa.'),
    });
  }
}
