import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAuth0 } from '@auth0/auth0-angular';
// @ts-ignore
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAuth0({
      domain: 'https://dev-1hmed-ch.us.auth0.com/',
      clientId: 'p1eXLgVKeAEUMNSIuUYVUbAxg9DB11PP',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'https://mini-ecommerce-api'
      },
      httpInterceptor: {
        allowedList: [
          {
            uri: 'http://localhost:8080/api/*',
            tokenOptions: {
              authorizationParams: {
                audience: 'https://mini-ecommerce-api'
              }
            }
          }
        ]
      }
    })
  ]
}).catch(err => console.error(err));
