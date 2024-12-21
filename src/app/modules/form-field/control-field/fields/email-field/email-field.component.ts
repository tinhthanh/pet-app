import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FieldComp } from '../field-comp.directive';
import { EmailField } from '../../../form.field';
import { ValidatorStr, toValidator } from '../../../form.validation';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-email-field',
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
export class EmailFieldComponent
  extends FieldComp<EmailField>
  implements OnInit
{
  override ngOnInit(): void {
    super.ngOnInit();
    this.control.addValidators(toValidator[ValidatorStr.email](this.field));
  }
}
