import { APP_INITIALIZER } from "@angular/core";
import { EnvironmentLoadService } from './environment-load.service';


export const environmentInitFactory = (envService: EnvironmentLoadService) =>
  async () => await envService.loadConfig().toPromise();

export const environmentLoadInitializer = {
  provide: APP_INITIALIZER,
  multi: true,
  deps: [
    EnvironmentLoadService
  ],
  useFactory: environmentInitFactory
};
