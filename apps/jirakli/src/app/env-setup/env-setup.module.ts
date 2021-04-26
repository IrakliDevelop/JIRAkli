import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvironmentLoadService } from "./environment-load.service";
import { environmentLoadInitializer } from "./environment-load.initialzier";
import { HttpClientModule } from "@angular/common/http";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    EnvironmentLoadService,
    environmentLoadInitializer
  ]
})
export class EnvSetupModule { }
