import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { WelcomeOnboardingComponent } from '../../welcome-onboarding/welcome-onboarding.component';
import { ProfileInfoComponent } from '../../profiles/profile-info/profile-info.component';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.component.html',
  styleUrls: ['./tab3.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProfileInfoComponent,WelcomeOnboardingComponent,IonTitle, IonContent,IonHeader, IonToolbar]
})
export class Tab3Component  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
