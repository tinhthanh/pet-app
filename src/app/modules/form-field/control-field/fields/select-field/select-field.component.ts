import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FieldComp } from '../field-comp.directive';
import { SelectField } from '../../../form.field';
import { TranslateModule } from '@ngx-translate/core';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  standalone: true,
  selector: 'app-select-field',
  template: `
  @if (field) {
    <div  class="form-group form-floating">
      <nz-select 
       [nzMode]="field.multiple ? 'multiple' : 'default'"
       [nzMaxTagCount]="1"
       nzBorderless  [nzSize]="'small'" class="w-100 form-control !pl-1 " nzShowSearch nzAllowClear [nzPlaceHolder]="field.placeholder || ''"  [formControl]="control">
        @for( option of field.options; track option.value ) {
            <nz-option [nzLabel]="option.label" [nzValue]="option.value"></nz-option>
         }
    </nz-select>
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
  imports: [TranslateModule,NzSelectModule, ReactiveFormsModule],
})
export class SelectFieldComponent
  extends FieldComp<SelectField>
  implements OnInit
{
  override ngOnInit(): void {
    super.ngOnInit();
    console.log(this.field);
  }
}
