import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FieldComp } from '../field-comp.directive';
import { InputNumberField } from '../../../form.field';
import { ValidatorStr, toValidator } from '../../../form.validation';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-number-field',
  template: `
    @if(field) {
    <div class="form-group form-floating">
      <input
        [placeholder]="field.placeholder || ''"
        type="tel"
        class="form-control"
        [formControl]="control"
        [attr.name]="field.name"
        mask="separator"
        thousandSeparator=","
      />
      <label
        >{{ field.label | translate }}
        @if(field.required) {
        <sup>*</sup>
        }
      </label>
      @if(control.invalid && control.errors){
      <div class="error-message">
        {{ control.errors['msg'] | translate : control.errors['params'] || {} }}
      </div>
      }
    </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, NgxMaskDirective, TranslateModule],
})
export class NumberFieldComponent
  extends FieldComp<InputNumberField>
  implements OnInit
{
  override ngOnInit(): void {
    super.ngOnInit();
    if (this.field?.min) {
      this.control.addValidators(toValidator[ValidatorStr.min](this.field));
    }
    if (this.field?.max) {
      this.control.addValidators(toValidator[ValidatorStr.max](this.field));
    }
  }
}
