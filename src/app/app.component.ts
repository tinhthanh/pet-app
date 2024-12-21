import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IonApp } from '@ionic/angular/standalone';
// import { HomePage } from './home/home.page';
// import { RoutersPage } from './routers/routers.page';
import { SwUpdate } from '@angular/service-worker';
import { RouterOutlet } from '@angular/router';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  // selector: '[id=app]',
  selector: 'app-root',
  template: `
    <ion-app>
      <!-- <app-routers-page></app-routers-page> -->
      <router-outlet></router-outlet>
    </ion-app>
  `,
  standalone: true,
  imports: [IonApp,RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor( private swUpdate: SwUpdate) {}
  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      // schedule check 60s
      // interval(60 * 1000).subscribe(() => this.swUpdate.checkForUpdate());
      this.swUpdate.versionUpdates.subscribe((evt) => {
        switch (evt.type) {
          case 'VERSION_DETECTED':
              console.log(`Downloading new app version: ${evt.version.hash}`);
              break;
          case 'VERSION_READY':
              console.log(`Current app version: ${evt.currentVersion.hash}`);
              console.log(`New app version ready for use: ${evt.latestVersion.hash}`);
              window.location.reload();
              break;
          case 'VERSION_INSTALLATION_FAILED':
               window.location.reload();
              break;
        }
      });
    }
  }
  
}
