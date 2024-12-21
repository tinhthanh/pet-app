import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FieldComp } from '../field-comp.directive';
import { PhoneField } from '../../../form.field';
import { toValidator, ValidatorStr } from '../../../form.validation';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  standalone: true,
  selector: 'app-phone-field',
  template: `
    @if(field) {
    <div class="form-group form-floating">
      <input
        [placeholder]="field.placeholder || ''"
        type="tel"
        class="form-control"
        [formControl]="control"
        [attr.name]="field.name"
        mask="(000) 000 0000 || (000) 0000 0000"
      />
      <label
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, TranslateModule, NgxMaskDirective],
})
export class PhoneFieldComponent
  extends FieldComp<PhoneField>
  implements OnInit
{
  override ngOnInit(): void {
    super.ngOnInit();
    this.control.addValidators(toValidator[ValidatorStr.phone](this.field));
  }
}
