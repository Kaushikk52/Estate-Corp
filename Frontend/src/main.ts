import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
