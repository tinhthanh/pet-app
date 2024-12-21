import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { library, playCircle, radio, search } from 'ionicons/icons';
import { IonTabs, IonTab, IonHeader, IonToolbar, IonTitle, IonContent, IonTabBar, IonTabButton, IonIcon } from "@ionic/angular/standalone";
import { PetCardComponent } from '../pet-card/pet-card.component';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true, 
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    PetCardComponent,
    IonIcon, IonTabButton, IonTabBar, IonContent, IonTitle, IonToolbar, IonHeader, IonTab, IonTabs, ]
})
export class HomeComponent  implements OnInit {

  constructor() {
    addIcons({ library, playCircle, radio, search });
   }

  ngOnInit() {}

}
