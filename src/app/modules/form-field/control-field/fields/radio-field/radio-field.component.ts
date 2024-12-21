import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { FieldComp } from '../field-comp.directive';
import { RadioField } from '../../../form.field';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-radio-field',
  styleUrls: ['./radio-field.component.scss'],
  template: `
    @if( field) {
    <div class="form-group form-floating">
      <div class="pb-2 label-field">
        {{ field.label | translate }}
        @if(field.required) {
        <sup>*</sup>
        }
      </div>
      <form class="inline">
        <div class="field-control">
          <div class="radio-wrapper">
            @if(field.options && field.options.length > 0) { @for(option of
            field.options; track option) {
            <label [for]="field.name + uuid" class="radio">
              <input
                [name]="field.name + uuid"
                [formControl]="control"
                [value]="option.value"
                type="radio"
              />
              <svg viewBox="0 0 24 24" filter="url(#goo-light)">
                <circle class="top" cx="12" cy="-12" r="8" />
                <circle class="dot" cx="12" cy="12" r="5" />
                <circle class="drop" cx="12" cy="12" r="2" />
              </svg>
              <div class="form-check-label">
                {{ option.label | translate }}
              </div>
            </label>
            } }
          </div>
        </div>
      </form>
      @if (control.invalid && control.errors) {
      <div class="error-message">
        {{ control.errors['msg'] | translate : control.errors['params'] || {} }}
      </div>
      }
    </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateModule, ReactiveFormsModule],
})
export class RadioFieldComponent
  extends FieldComp<RadioField>
  implements OnInit, AfterViewInit
{
  ngAfterViewInit(): void {
    // fix for required field
    setTimeout(() => {
      this.markForCheck();
    }, 100);
  }
  uuid = Math.random();
  override ngOnInit(): void {
    super.ngOnInit();
    this.control.registerOnChange(() => {
      console.log('change');
    });
  }
}
