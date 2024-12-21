import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FieldComp } from '../field-comp.directive';
import { format, parse } from 'date-fns';
import { of } from 'rxjs';
import { toValidator, ValidatorStr } from '../../../form.validation';
import { DateField } from '../../../form.field';
import { formatDate } from '../../../db-utils';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { TranslateModule } from '@ngx-translate/core';
import {
  IonContent,
  IonDatetime,
  IonIcon,
  IonModal,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { calendarOutline } from 'ionicons/icons';

@Component({
  standalone: true,
  selector: 'app-date-field',
  template: `
    @if (field) {
    <div class="form-group form-floating">
      <input
        type="tel"
        class="form-control"
        [formControl]="control"
        placeholder="dd/MM/yyyy"
        [attr.name]="field.name"
        mask="00/00/0000"
        [dropSpecialCharacters]="false"
      />
      <ion-icon (click)="openModal()" name="calendar-outline"></ion-icon>
      <label class="form-check-label"
        >{{ field.label | translate }}
        @if(field.required) {
        <sup>*</sup>
        }
      </label>
      @if(control.invalid && control.errors) {
        <div class="error-message">
        {{ control.errors['msg'] | translate : control.errors['params'] || {} }}
        </div>
      }
    </div>
    }

    <ion-modal
      [canDismiss]="closePopup"
      [isOpen]="isModalOpen"
      showBackdrop="false"
      style=" --background: transparent; --box-shadow: none;"
    >
      <ng-template>
        <ion-content style=" --background: transparent; --box-shadow: none;">
          <ion-datetime
            mode="ios"
            #popoverDatetime
            style="margin: 0 auto;"
            [value]="currentDate"
            (ionChange)="valueDateChange(popoverDatetime.value)"
            [locale]="locale"
            presentation="date"
          ></ion-datetime>
        </ion-content>
      </ng-template>
    </ion-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    NgxMaskDirective,
    TranslateModule,
    IonIcon,
    IonModal,
    IonContent,
    IonDatetime,
  ],
  styles: `
  ion-datetime {
    border-radius: 16px;
  }
  `
})
export class DateFieldComponent
  extends FieldComp<DateField>
  implements OnInit
{
  readonly locale = 'vi';
  isModalOpen = false;
  currentDate: string | null = null;
  constructor(private cdf: ChangeDetectorRef) {
    super();
    addIcons({
      'calendar-outline': calendarOutline,
    });
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.control.addValidators(toValidator[ValidatorStr.date](this.field));
  }
  openModal(): void {
    if (this.control.value && this.control.valid) {
      this.currentDate = formatDate(
        parse(this.control.value, 'dd/MM/yyyy', new Date())
      );
    }
    this.isModalOpen = true;
    this.cdf.markForCheck();
  }
  closePopup = async () => {
    this.isModalOpen = false;
    this.cdf.markForCheck();
    return of(true).toPromise();
  };

  valueDateChange(value: string | string[] | null | undefined): void {
    if (!value) {
      return;
    }
    const date = new Date(value as string);
    const dateStr = format(date, 'dd/MM/yyyy');
    console.log(dateStr);
    this.control.setValue(dateStr);
    this.isModalOpen = false;
    this.cdf.markForCheck();
  }
}
