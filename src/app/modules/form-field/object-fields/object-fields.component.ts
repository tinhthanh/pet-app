import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  ArrayObject,
  ControlType,
  FieldMode,
  ObjectFields,
} from '../form.field';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { KeyValuePipe, NgTemplateOutlet } from '@angular/common';
import { ArrayObjectComponent } from '../array-object/array-object.component';
import { ControlFieldComponent } from '../control-field/control-field.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-object-fields',
  template: `
    @if(objectField) {
    <ng-container [formGroup]="formGroup">
      @if (objectField.label) {
      <label class="label-card "> ({{(arrayForm.value || []).length}}) {{ objectField.label }} </label>
      } @if(objectField.type === controlType.ArrayObject && arrayForm &&
      objectField.property) {
      <app-array-object
        [fieldMode]="fieldMode"
        [formGroup]="arrayForm"
        [arrayObject]="objectField.property"
      ></app-array-object>
      } @if(objectField.type === controlType.ObjectFields) {
      <ng-container
        *ngTemplateOutlet="
          inner;
          context: {
            type: objectField.type,
            property: objectField.property,
            form: formGroup.get(objectField.name),
            lable: objectField?.label || ''
          }
        "
      >
      </ng-container>
      }

      <ng-template
        #inner
        let-type="type"
        let-property="property"
        let-form="form"
        let-lable="lable"
      >
        @if(type === controlType.ObjectFields) {
        <form [formGroup]="form" class="row" >
          @for(item of property | keyvalue : orderOriginal ; track item) {
          @if(!$any(item.value).property) {
          <app-control-field
            [mode]="fieldMode"
            [field]="$any(item.value)"
            [formControlName]="$any(item.value).name"
            [class]="$any(item.value).classes || ''"
          ></app-control-field>
          } @if( $any(item.value).property &&
          Object.values($any(item.value).property).length > 0) {
          <ng-container
            *ngTemplateOutlet="
              inner;
              context: {
                type: $any(item.value).type,
                property: Object.values($any(item.value).property),
                form: form.get($any(item.value).name),
                lable: $any(item.value)?.label || ''
              }
            "
          >
          </ng-container>
          } }
        </form>
        } @if(type === controlType.ArrayObject) {
          <label class="label-card flex gap-1">
          ({{(form.value || []).length}})
          {{ lable }}
         </label>
        <app-array-object
          [formGroup]="form"
          [arrayObject]="property"
          [fieldMode]="fieldMode"
        ></app-array-object>
        }
      </ng-template>
    </ng-container>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    KeyValuePipe,
    ArrayObjectComponent,
    ControlFieldComponent,
    NgTemplateOutlet,
    TranslateModule,
  ],
})
export class ObjectFieldsComponent<T> {
  @Input() fieldMode: FieldMode = FieldMode.LIVE;
  @Input() formGroup!: FormGroup;
  @Input() objectField!: ObjectFields<T> | ArrayObject<T>;
  readonly controlType = ControlType;

  get arrayForm() {
    return this.formGroup.get(this.objectField.name) as FormGroup;
  }
  orderOriginal = () => 0;
  protected readonly Object = Object;
}
