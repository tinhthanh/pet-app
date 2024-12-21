import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonContent, IonTitle, IonNavLink, IonButton, IonFab, IonFabButton, IonIcon, IonRefresher, IonRefresherContent, ModalController } from "@ionic/angular/standalone";
import { PetCardComponent } from '../../pet-card/pet-card.component';
import { PetDetailsComponent } from '../pet-details/pet-details.component';
import { RoutersService } from 'src/app/routers/routers.service';
import { BscClincComponent } from '../../comp/bsc-clinc/bsc-clinc.component';
import { TemperatureComponent } from '../../comp/temperature/temperature.component';
import { ScaleComponent } from '../../comp/scale/scale.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import {add } from 'ionicons/icons';
import { ViewPetDetailsComponent } from '../../pages/view-pet-details/view-pet-details.component';
import { SearchPetComponent } from "../../comp/search-pet/search-pet.component";

@Component({
    selector: 'app-search-tab',
    templateUrl: './search-tab.component.html',
    styleUrls: ['./search-tab.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IonRefresherContent, IonRefresher, IonIcon, IonFabButton, IonFab, ReactiveFormsModule, ScaleComponent, TemperatureComponent, BscClincComponent, IonButton, IonNavLink, IonTitle, IonContent, IonHeader, IonToolbar, PetCardComponent, SearchPetComponent]
})
export class SearchTabComponent  implements OnInit {
  readonly filter = new FormGroup({
    search: new FormControl<string>("")
});
isFocus = signal(false);
  component = PetDetailsComponent;
  private router = inject(RoutersService);
  constructor(private modalCtrl: ModalController) { 
    addIcons({add})
  }
  focusSearch() {
    this.isFocus.set(true);
}
  ngOnInit() {}
  toLink() {
      this.router.push(['/pet/details']);
  }
  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 1500);
  }
  async viewDetails() {
       const modal = await this.modalCtrl.create({
            component: ViewPetDetailsComponent,
          });
          modal.present();
      
          const { data, role } = await modal.onWillDismiss();
      
          if (role === 'confirm') {
            debugger
          }
  }
}
