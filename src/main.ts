import { enableProdMode, importProvidersFrom, inject, isDevMode, LOCALE_ID } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { MarkdownModule } from 'ngx-markdown';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import {
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import vi from '@angular/common/locales/vi';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { provideServiceWorker } from '@angular/service-worker';
import { provideAnimations } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module';
if (environment.production) {
  enableProdMode();
}
registerLocaleData(vi);
export function createTranslateLoader(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(MarkdownModule.forRoot()),
    provideAnimations(),
    provideIonicAngular({ mode: 'ios' }),
    provideHttpClient(),
    provideEnvironmentNgxMask(),
    importProvidersFrom(TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient],
        },
        defaultLanguage: 'vi'
    })),
    {
      provide: NZ_I18N,
      useValue: vi_VN
    },
    provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    })
],
}).then();
