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
import { DateTimeField } from '../../../form.field';
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
  selector: 'app-date-time-field',
  template: `
    @if(field) {
    <div class="form-group form-floating">
      <input
        type="tel"
        class="form-control"
        [formControl]="control"
        placeholder="dd/MM/yyyy HH:mm"
        [attr.name]="field.name"
        mask="00/00/0000 00:00"
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
          <ion-datetime
            mode="ios"
            #popoverDatetime
            hourValues="8,9,10,11,12,13,14,15,16,17,18,19,20"
            minuteValues="0,15,30,45"
            showDefaultButtons="true"
            style="margin: 0 auto;"
            [value]="currentDate"
            [yearValues]="yearValues"
            (ionChange)="valueDateChange(popoverDatetime.value)"
            [locale]="locale"
            [doneText]="'HoanTat' | translate"
            [cancelText]="'Huy' | translate"
          >
            <span slot="time-label">{{ 'ThoiGian' | translate }}</span>
          </ion-datetime>
      </ng-template>
    </ion-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    NgxMaskDirective,
    TranslateModule,
    IonContent,
    IonDatetime,
    IonModal,
    IonIcon,
  ],
  styles: `
   ion-datetime {
    border-radius: 16px;
  }
  `
})
export class DateTimeFieldComponent
  extends FieldComp<DateTimeField>
  implements OnInit
{
  readonly locale = 'vi';
  year = new Date().getFullYear();
  yearValues = [this.year - 1, this.year, this.year + 1, this.year + 2].join(
    ','
  );
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
    this.control.addValidators(toValidator[ValidatorStr.dateTime](this.field));
  }
  openModal(): void {
    if (this.control.value && this.control.valid) {
      this.currentDate = formatDate(
        parse(this.control.value, 'dd/MM/yyyy HH:mm', new Date())
      );
    }
    this.isModalOpen = true;
    this.cdf.detectChanges();
  }
  closePopup = async () => {
    this.isModalOpen = false;
    this.cdf.markForCheck();
    return of(true).toPromise();
  };

  valueDateChange(value: string | string[] | null | undefined): void {
    if (value) {
      const date = new Date(value as string);
      const dateStr = format(date, 'dd/MM/yyyy HH:mm');
      console.log(dateStr);
      this.control.setValue(dateStr);
      this.isModalOpen = false;
      this.cdf.markForCheck();
    }
  }
}
