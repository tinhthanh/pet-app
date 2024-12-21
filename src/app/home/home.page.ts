import { Component } from '@angular/core';
import {IonHeader, IonToolbar, IonTitle, IonContent, IonIcon} from '@ionic/angular/standalone';
import {GlassMorphismModule} from "../modules/glass-morphism/glass-morphism.module";
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, GlassMorphismModule],
})
export class HomePage {
  constructor() {

  }
  submit(data: any) {
    console.log(data);
  }
}
