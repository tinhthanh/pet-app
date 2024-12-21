import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircle } from 'ionicons/icons';
@Component({
  selector: 'app-content-section',
  template: `
    <div class="content-section">
      <div class="content-section-title flex flex-row">
        <div>
          {{title}}
        </div>
        <ion-icon (click)="vgCreate.emit()" class="text-2xl ml-1 cursor-pointer btn-primary" name="add-circle"></ion-icon>
      </div>
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./content-section.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonIcon,
    NgClass
  ]
})
export class ContentSectionComponent  {
  @Input() title : string = '';
  @Output() vgCreate = new EventEmitter<void>();
  constructor() {
    addIcons({
      'add-circle' : addCircle
    })
  }

}
