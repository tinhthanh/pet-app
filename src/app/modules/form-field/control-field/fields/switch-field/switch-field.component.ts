import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FieldComp } from '../field-comp.directive';
import { SwitchBoxField } from '../../../form.field';
import {ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  standalone: true,
  selector: 'app-switch-field',
  template: `
  @if (field) {
    <div
      class="form-group form-floating"
    >
      <div>
        <div class="field-control">
          <div class="radio-wrapper">
            <label [for]="field.name + uuid" class="switch">
              <input
                [name]="field.name + uuid"
                class="switch-input"
                [formControl]="control"
                type="checkbox"
              />
              <svg viewBox="0 0 38 24" filter="url(#goo)">
                <circle class="default" cx="12" cy="12" r="8"/>
                <circle class="dot" cx="26" cy="12" r="8"/>
                <circle class="drop" cx="25" cy="-1" r="2"/>
              </svg>
              <div class="form-check-label">
                {{ field.label | translate }}
              </div>
            </label>
          </div>
        </div>
      </div>
      @if(control.invalid && control.errors) {
        <div class="error-message" >
        {{ control.errors['msg'] | translate : control.errors['params'] || {} }}
      </div>
      }
    </div>
  }
  `,
  styles: `
   .form-check-label {
    color: var(--color-950 , #666670) ;
  }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class SwitchFieldComponent extends FieldComp<SwitchBoxField> implements OnInit {
  uuid = Math.random();
 override ngOnInit(): void {
    super.ngOnInit();
  }
}
