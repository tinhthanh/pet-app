import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AccountLayoutComponent } from '../../account-layout/account-layout.component';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.component.html',
  styleUrls: ['./tab4.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AccountLayoutComponent,IonTitle, IonContent,IonHeader, IonToolbar]
})
export class Tab4Component  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
