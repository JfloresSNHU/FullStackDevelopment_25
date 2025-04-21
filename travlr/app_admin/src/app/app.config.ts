import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';

export const appConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations()
  ]
};
