import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Project {
  id: string;
  key: string;
  name: string;
  description: string | null;
  createdById: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectsResponse {
  data: Project[];
}

interface ProjectResponse {
  data: Project;
}

export interface CreateProjectDto {
  key: string;
  name: string;
  description?: string;
}

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getProjects(): Observable<Project[]> {
    return this.http
      .get<ProjectsResponse>(`${this.apiUrl}/projects`)
      .pipe(map((res) => res.data));
  }

  getProject(id: string): Observable<Project> {
    return this.http
      .get<ProjectResponse>(`${this.apiUrl}/projects/${id}`)
      .pipe(map((res) => res.data));
  }

  createProject(dto: CreateProjectDto): Observable<Project> {
    return this.http
      .post<ProjectResponse>(`${this.apiUrl}/projects`, dto)
      .pipe(map((res) => res.data));
  }

  deleteProject(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/projects/${id}`);
  }
}
