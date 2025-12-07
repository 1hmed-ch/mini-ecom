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
      domain: '',
      clientId: '',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: ''
      },
      httpInterceptor: {
        allowedList: [
          {
            uri: 'http://localhost:8080/api/*',
            tokenOptions: {
              authorizationParams: {
                audience: 'YOUR_AUTH0_AUDIENCE'
              }
            }
          }
        ]
      }
    })
  ]
}).catch(err => console.error(err));
