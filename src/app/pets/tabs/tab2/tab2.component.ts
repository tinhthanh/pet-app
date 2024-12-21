import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.component.html',
  styleUrls: ['./tab2.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonIcon, IonTitle, IonContent,IonHeader, IonToolbar]
})
export class Tab2Component  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
