import { ApplicationConfig, importProvidersFrom, Provider } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { SharedModule } from '@app/shared/shared.module';
import { provideHttpClient, withFetch } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(SharedModule),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    // provideHttpClient(withInterceptors([MyInterceptor]))
  ],
};
