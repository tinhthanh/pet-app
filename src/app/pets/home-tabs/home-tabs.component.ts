import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import {paw, library, playCircle, radio, search,calendar,personCircle } from 'ionicons/icons';
@Component({
  selector: 'app-home-tabs',
  templateUrl: './home-tabs.component.html',
  styleUrls: ['./home-tabs.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonIcon, IonTabButton, IonTabBar, IonTabs, ]
})
export class HomeTabsComponent  implements OnInit {

  constructor() { 
    addIcons({ paw,library, playCircle, radio, search,calendar,personCircle });
  }

  ngOnInit() {}

}
