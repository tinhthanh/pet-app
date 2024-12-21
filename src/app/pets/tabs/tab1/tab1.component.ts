import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonContent, IonTitle, IonNavLink, IonButton, IonNav } from "@ionic/angular/standalone";
import { PetCardComponent } from '../../pet-card/pet-card.component';
import { SearchTabComponent } from '../search-tab/search-tab.component';
@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.component.html',
  styleUrls: ['./tab1.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonNav, SearchTabComponent,IonButton, IonNavLink, IonTitle, IonContent,IonHeader, IonToolbar,PetCardComponent]
})
export class Tab1Component  implements OnInit {
  component = SearchTabComponent;
  constructor() { }

  ngOnInit() {}

}
