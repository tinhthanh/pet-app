import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FieldComp } from '../field-comp.directive';
import { TextField } from '../../../form.field';
import { ValidatorStr, toValidator } from '../../../form.validation';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-text-field',
  template: `
    @if(field) {
    <div class="form-group form-floating">
      <input
        type="text"
        class="form-control"
        [formControl]="control"
        [placeholder]="field.placeholder || ''"
        [attr.name]="field.name"
      />
      <label
        >{{ field.label | translate }}
        @if (field.required) {
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
  imports: [ReactiveFormsModule, TranslateModule],
})
export class TextFieldComponent
  extends FieldComp<TextField>
  implements OnInit
{
  override ngOnInit(): void {
    super.ngOnInit();
    if (this.field?.maxLength) {
      this.control.addValidators(
        toValidator[ValidatorStr.maxLength](this.field)
      );
    }
    if (this.field?.minLength) {
      this.control.addValidators(
        toValidator[ValidatorStr.minLength](this.field)
      );
    }
  }
}
