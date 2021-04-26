import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthHttpService {

  constructor(private http: HttpClient) { }
}
