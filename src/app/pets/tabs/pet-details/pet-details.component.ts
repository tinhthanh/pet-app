import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { IonNavLink, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons } from "@ionic/angular/standalone";
import { RoutersService } from 'src/app/routers/routers.service';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonButtons, IonBackButton, IonContent, IonTitle, IonNavLink, IonButton, IonHeader, IonToolbar]
})
export class PetDetailsComponent  implements OnInit {
  private router = inject(RoutersService);
  constructor() { }

  ngOnInit() {}
  backToHome() {
    this.router.push(['/pet/home/tab1']);
  }

}
