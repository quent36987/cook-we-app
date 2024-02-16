import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

export const API_URL = 'http://localhost:9001/api';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
