import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";

import { ContentSectionComponent } from "../content-section/content-section.component";
import { NgClass } from "@angular/common";
import { CardListComponent } from "../card-list/card-list.component";
import { IonIcon ,IonPopover ,IonContent ,IonLabel ,IonItem ,IonList } from '@ionic/angular/standalone';
import { AuthService } from "../../../auth/auth.service";
import { addIcons } from "ionicons";
import { person ,logOutOutline , rocketOutline , personOutline, chatbubbleOutline}  from "ionicons/icons";
import { FormCrudAppComponent } from "../../../forms/form-crud-app/form-crud-app.component";
import { RoutersService } from "src/app/routers/routers.service";
@Component({
  standalone: true,
  selector: 'app-morphism-app',
  templateUrl: './morphism-app.component.html',
  styleUrls: ['./morphism-app.component.scss'],
  imports: [IonList, IonItem, IonLabel, IonContent, IonPopover, IonIcon,
    ContentSectionComponent,
    CardListComponent,
    FormCrudAppComponent,
    NgClass
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MorphismAppComponent {
  readonly auth = inject(AuthService);
  readonly router = inject(RoutersService)
  constructor( ) {
    addIcons({
      'person': person,
      'log-out-outline': logOutOutline,
      'rocket-outline': rocketOutline,
      'person-outline': personOutline,
      'chatbubble-outline': chatbubbleOutline
    })
  }
  requestLogin() {
    this.auth.requestLogin();
  }
  toPetApp() {
   
    this.router.push(['/pet/home/tab1'])
  }
}
