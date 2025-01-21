import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideEchartsCore, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import * as echarts from 'echarts';  // Importación estática

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideEchartsCore({ echarts })  // Importación con objeto de configuración
  ]
});
