import { ChangeDetectionStrategy, Component, OnInit, computed, inject } from '@angular/core';
import { FieldComp } from '../field-comp.directive';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ControlType, IField } from '../../../form.field';
import { ValidatorType } from '../../../form.builder';
import { ColorPicModule } from 'src/app/builder/color-picker/color-pic.module';
import { BuilderSignals } from 'src/app/builder/signals/builder.signals';
export class ColorField implements IField {
    required = false;
    name = '';
    placeholder = '';
    type: string = ControlType.color;
    label = '';
    classes?: string;
    onChange?: (field: IField ,value: FormControl) => void;
    constructor(options: {
      name: string;
      disabled?: boolean;
      placeholder?: string;
      label?: string;
      required?: boolean;
      validators?: ValidatorType[] | null;
      classes?: string;
      onChange?: (field: ColorField ,value: FormControl) => void;
    }) {
      Object.assign(this, options);
    }
  }
@Component({
  standalone: true,
  selector: 'app-color-field',
  styleUrls: ['./color-field.scss'],
  template: `
    @if(field) {
    <div class="form-group form-floating">
      <input
        appColorPic [cpPresetColors]="cpPresetColors()"
        type="text"
        class="form-control"
        [formControl]="control"
        [placeholder]="field.placeholder || ''"
        [attr.name]="field.name"
      />
      <button appColorPic (vgSelect)="control.setValue($event)" [cpPresetColors]="cpPresetColors()" class="btn-copy">
          <svg class="svgs" id="icon-btn-copy"  xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8c.28 0 .5-.22.5-.5a.54.54 0 0 0-.14-.35c-.41-.46-.63-1.05-.63-1.65a2.5 2.5 0 0 1 2.5-2.5H16c2.21 0 4-1.79 4-4c0-3.86-3.59-7-8-7m-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 10 6.5 10s1.5.67 1.5 1.5S7.33 13 6.5 13m3-4C8.67 9 8 8.33 8 7.5S8.67 6 9.5 6s1.5.67 1.5 1.5S10.33 9 9.5 9m5 0c-.83 0-1.5-.67-1.5-1.5S13.67 6 14.5 6s1.5.67 1.5 1.5S15.33 9 14.5 9m4.5 2.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5s1.5.67 1.5 1.5" opacity="0.3"/><path fill="currentColor" d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10a2.5 2.5 0 0 0 1.86-4.17a.495.495 0 0 1 .37-.83H16c3.31 0 6-2.69 6-6c0-4.96-4.49-9-10-9m4 13h-1.77a2.5 2.5 0 0 0-2.5 2.5c0 .61.22 1.19.63 1.65c.06.07.14.19.14.35c0 .28-.22.5-.5.5c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.14 8 7c0 2.21-1.79 4-4 4"/><circle cx="6.5" cy="11.5" r="1.5" fill="currentColor"/><circle cx="9.5" cy="7.5" r="1.5" fill="currentColor"/><circle cx="14.5" cy="7.5" r="1.5" fill="currentColor"/><circle cx="17.5" cy="11.5" r="1.5" fill="currentColor"/></svg>
    </button>
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
  imports: [ReactiveFormsModule, TranslateModule ,ColorPicModule],
})
export class ColorFieldComponent
  extends FieldComp<ColorField>
  implements OnInit
{  readonly builderSignals = inject(BuilderSignals);
    readonly currentApp = this.builderSignals.select('currentApp');
    readonly cpPresetColors = computed(() => {
        return this.currentApp()?.attributes || {};
      })
  override ngOnInit(): void {
    super.ngOnInit();
  }
}
