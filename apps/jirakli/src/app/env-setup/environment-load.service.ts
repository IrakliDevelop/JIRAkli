import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { EnvironmentVariables } from "../core/models/environment-variables.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { tap } from "rxjs/operators";

@Injectable()
export class EnvironmentLoadService {
  environment$ = new BehaviorSubject<EnvironmentVariables>(null);

  get environment(): EnvironmentVariables {
    return this.environment$.getValue();
  }

  constructor(private http: HttpClient) { }

  loadConfig(): Observable<EnvironmentVariables> {
    return this.http.get<EnvironmentVariables>(environment.envPath).pipe(
      tap((env) => this.environment$.next(env))
    );
  }
}
