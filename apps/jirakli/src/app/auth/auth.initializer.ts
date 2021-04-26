import { APP_INITIALIZER } from "@angular/core";
import { AuthConfigModel } from "../core/models";
import { HttpClient } from "@angular/common/http";
import { AuthClientConfig } from "@auth0/auth0-angular";
import { environment } from '../../environments/environment';


export function authConfigFactory(http: HttpClient, config: AuthClientConfig) {
  return () => http.get<AuthConfigModel>(environment.authConfigPath).toPromise()
    .then((loadedConfig) => config.set(loadedConfig))
}

export const authConfigInitializer = {
  provide: APP_INITIALIZER,
  multi: true,
  deps: [
    HttpClient, AuthClientConfig
  ],
  useFactory: authConfigFactory,
}
