import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { AuthModule } from "./auth/auth.module";
import { EnvSetupModule } from "./env-setup/env-setup.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, EnvSetupModule, AuthModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
