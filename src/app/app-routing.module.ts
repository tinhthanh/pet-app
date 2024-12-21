import { Routes } from '@angular/router';
import { HomeComponent } from './pets/home/home.component';
import { HomeTabsComponent } from './pets/home-tabs/home-tabs.component';
import { PetDetailsComponent } from './pets/tabs/pet-details/pet-details.component';

export const routes: Routes = [
  { path: '',   redirectTo: '/pet/home/tab1', pathMatch: 'full' },
  {
    path: 'pet',
    component: HomeComponent,
    children: [{
      path: 'home',
      component: HomeTabsComponent ,
      children: [
        {
          path: 'tab1',
          loadComponent: () =>  import('./pets/tabs/tab1/tab1.component').then((m) => m.Tab1Component) 
        },
        {
          path: 'tab2',
          loadComponent: () =>  import('./pets/tabs/tab2/tab2.component').then((m) => m.Tab2Component) 
        },
        {
          path: 'tab3',
          loadComponent: () =>  import('./pets/tabs/tab3/tab3.component').then((m) => m.Tab3Component) 
        },
        {
          path: 'tab4',
          loadComponent: () =>  import('./pets/tabs/tab4/tab4.component').then((m) => m.Tab4Component) 
        }
      ]
    },{
      path: 'details',
      component: PetDetailsComponent
    }]
  } 
];