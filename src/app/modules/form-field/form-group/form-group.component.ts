import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectionStrategy,
  ElementRef,
} from '@angular/core';
import { ControlType, FieldMode, IField, ObjectFields } from '../form.field';
import { FormGroup, FormsModule } from '@angular/forms';
import { getDefaultModel, toFormGroup } from '../form.builder';
import { ObjectFieldsComponent } from '../object-fields/object-fields.component';
import { UiButtonSubmitComponent } from '../ui/ui-button-submit.component';
import { NgClass } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-form-group',
  template: `
    <form
      #ngForm="ngForm"
      (ngSubmit)="submit()"
      [ngClass]="{ submitted: ngForm.submitted }"
    >
      @if (formGroup) {
      <app-object-fields
        [formGroup]="formGroup"
        [fieldMode]="fieldMode"
        [objectField]="data"
      ></app-object-fields>
      }

      <div class="d-flex justify-content-center">
        <app-ui-button-submit [title]="title" ></app-ui-button-submit>
      </div>
    </form>
  `,
  imports: [
    ObjectFieldsComponent,
    UiButtonSubmitComponent,
    NgClass,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormGroupComponent<T> {
  @Input() formGroup!: FormGroup;
  data!: ObjectFields<T>;
  @Input() title = 'Submit';
  @Input() fieldMode: FieldMode = FieldMode.LIVE;
  @Input() patchValue!: Partial<T>;
  _config!: { [K in keyof T]: IField };
 @Input() set config( data: { [K in keyof T]: IField }) {
    this._config = data;
    this.resetForm();
 };
  @Output() submitEvent = new EventEmitter<T>();
  constructor(public element: ElementRef) {}
  resetForm(): void {
    if (this._config) {
      this.data = new ObjectFields({
        name: 'root',
        property: this._config,
      });
      let model: { root: T };
      if (this.patchValue) {
        model = { root: transform(this._config, this.patchValue) } as {
          root: T;
        };
      } else {
        model = getDefaultModel(this.data) as { root: T };
      }
      this.formGroup = toFormGroup(model) as FormGroup;
    }
  }

  submit() {
    if (this.formGroup.valid) {
      console.log(this.formGroup.getRawValue());
      const { root } = this.formGroup.getRawValue();
      this.submitEvent.emit(root);
    } else {
      this.scrollToFirstInvalidControl();
    }
  }
  private scrollToFirstInvalidControl() {
    let form = this.element.nativeElement;
    let firstInvalidControl = [
      ...form.querySelectorAll(
        'input.ng-invalid, textarea.ng-invalid'
      ),
    ].shift();
    if (firstInvalidControl) {
      firstInvalidControl.scrollIntoView();
      (firstInvalidControl as HTMLElement).focus();
    }
  }
}
const transform = <T>(input: { [key: string]: IField }, data: T) => {
  return Object.keys(input).reduce((pre: any, cur) => {
    if (input[cur].type === ControlType.ArrayObject) {
      pre[cur] = data
        ? ((data as any)[cur] || []).map((item: T) => {
            return transform(
              input[cur].property as { [key: string]: IField },
              item
            );
          })
        : [];
      return pre;
    }
    if (input[cur].type === ControlType.ObjectFields) {
      pre[cur] = transform(
        input[cur].property as { [key: string]: IField },
        (data as any)[cur]
      );
      return pre;
    }
    if (data && (data as any)[cur] === undefined) {
      pre[cur] = null;
      return pre;
    }
    pre[cur] = data ? (data as any)[cur] : null;
    return pre;
  }, {});
};
