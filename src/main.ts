import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";
import { applyCareersConfig } from "./app/careers.config";
import { environment } from "./environments/environment";

/**
 * Configuration has to land before Angular starts.
 *
 * `ServerApiService` reads `sessionStorage.APIENDPOINTNEW` in its constructor
 * and `DataStoreService` reads `COMPANYID` in its own, so both are resolved the
 * first time anything injects them. Bootstrapping first and configuring after
 * would leave the library pointed at an empty host for the rest of the session.
 */
applyCareersConfig();

if (environment.production) enableProdMode();

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((error) => {
    console.error(error);
  });
