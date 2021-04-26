import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule as Auth0Module } from '@auth0/auth0-angular';
import { authConfigInitializer } from './auth.initializer';
import { AuthHttpService } from './auth-http.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Auth0Module.forRoot()
  ],
  providers: [
    authConfigInitializer,
    AuthHttpService
  ]
})
export class AuthModule { }
