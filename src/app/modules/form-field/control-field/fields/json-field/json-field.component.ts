import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FieldComp } from '../field-comp.directive';
import { JsonField } from '../../../form.field';
import { ValidatorStr, toValidator } from '../../../form.validation';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-json-field',
  template: `
    @if(field) {
    <div class="form-group form-floating">
      <textarea
        class="form-control"
        [style]="
          'min-height: ' + (field.minHeight ? field.minHeight : 104) + 'px'
        "
        [id]="field.name"
        [placeholder]="field.placeholder || ''"
        [formControl]="control"
        [attr.name]="field.name"
      >
      </textarea>
      <label
        >{{ field.label | translate }}
        @if(field.required) {
        <sup>*</sup>
        }
      </label>
      @if (control.invalid && control.errors) {
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
export class JsonFieldComponent
  extends FieldComp<JsonField>
  implements OnInit
{
  override ngOnInit(): void {
    super.ngOnInit();
    this.control.setValidators(
      toValidator[ValidatorStr.json](this.field)
    );
  }
}
