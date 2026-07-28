import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TASK_API_URL } from '../tokens/api-url.token';
import {
  CreateTaskRequest,
  Task,
  UpdateTaskStatusRequest,
} from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(
    private readonly http: HttpClient,
    @Inject(TASK_API_URL) private readonly apiUrl: string,
  ) {}

  findAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  create(request: CreateTaskRequest): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, request);
  }

  updateStatus(id: number, request: UpdateTaskStatusRequest): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${id}/status`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
