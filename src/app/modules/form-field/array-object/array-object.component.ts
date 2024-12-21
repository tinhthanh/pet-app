import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import { ArrayObject, ControlType, FieldMode } from '../form.field';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { toFormGroup, toValueDefault } from '../form.builder';
import { KeyValuePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ObjectFieldsComponent } from '../object-fields/object-fields.component';
import { ControlFieldComponent } from '../control-field/control-field.component';
import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  standalone: true,
  selector: 'app-array-object',
  template: `
    @if(formGroup) {
    <div class="mb-3 flex gap-2 flex-col" [formGroup]="formGroup"
     cdkDropList
    (cdkDropListDropped)="drop($event)"
    >
      @for (form of formGroup.controls; track form; let i = $index) {
      <div class="select-none flex flex-col border p-2 rounded-lg border-solid border-[#e6f0f8] gap-2 item-container" [formGroup]="form"  cdkDrag>
      <div cdkDragHandle class="remove-item">
        <div class="flex justify-between">
          <svg class="cursor-pointer text-red-400  hover:text-red-600" (click)="removeItem(i)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m19.5 5.5l-.62 10.025c-.158 2.561-.237 3.842-.88 4.763a4 4 0 0 1-1.2 1.128c-.957.584-2.24.584-4.806.584c-2.57 0-3.855 0-4.814-.585a4 4 0 0 1-1.2-1.13c-.642-.922-.72-2.205-.874-4.77L4.5 5.5M3 5.5h18m-4.944 0l-.683-1.408c-.453-.936-.68-1.403-1.071-1.695a2 2 0 0 0-.275-.172C13.594 2 13.074 2 12.035 2c-1.066 0-1.599 0-2.04.234a2 2 0 0 0-.278.18c-.395.303-.616.788-1.058 1.757L8.053 5.5m1.447 11v-6m5 6v-6" color="currentColor"/></svg>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v6m-9 3h6m12 0h-6m-3 9v-6.5M9 6l1.705-1.952C11.315 3.35 11.621 3 12 3c.38 0 .684.35 1.295 1.048L15 6m0 12l-1.705 1.952C12.685 20.65 12.379 21 12 21c-.38 0-.684-.35-1.295-1.048L9 18m9-9l1.952 1.705C20.65 11.315 21 11.621 21 12c0 .38-.35.684-1.048 1.295L18 15M6 15l-1.952-1.705C3.35 12.685 3 12.379 3 12c0-.38.35-.684 1.048-1.295L6 9" color="currentColor"/></svg>
          </div>
        </div>
      </div>
      <div class="row flex-1">
          @for( item of arrayObject | keyvalue: orderOriginal ; track item) {
          @if( item.value.type !== controlType.ObjectFields && item.value.type
          !== controlType.ArrayObject) {
          <app-control-field
            [mode]="fieldMode"
            [field]="item.value"
            [formControlName]="item.value.name"
            [class]="item.value.classes || ''"
          ></app-control-field>
          } @else if( item.value.type === controlType.ObjectFields ||
          item.value.type === controlType.ArrayObject ) {
          <app-object-fields
            [formGroup]="form"
            [fieldMode]="fieldMode"
            [objectField]="item.value"
          ></app-object-fields>
          } }
        </div>
      
      </div>
      <!-- <div class="dash-line mb-3"></div> -->
      }
      <div class="field-control">
        <div class="last">
          <button type="button" (click)="addItem()" class="btn">
            <span> Thêm</span>
            <svg preserveAspectRatio="none" viewBox="0 0 132 45">
              <g clip-path="url(#clip)" filter="url(#goo-big)">
                <circle class="top-left" cx="49.5" cy="-0.5" r="26.5" />
                <circle class="middle-bottom" cx="70.5" cy="40.5" r="26.5" />
                <circle class="top-right" cx="104" cy="6.5" r="27" />
                <circle class="right-bottom" cx="123.5" cy="36.5" r="26.5" />
                <circle class="left-bottom" cx="16.5" cy="28" r="30" />
              </g>
              <defs>
                <clipPath id="clip">
                  <rect width="132" height="45" rx="7" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
        <svg width="0" height="0">
          <defs>
            <filter
              id="goo"
              x="-50%"
              width="200%"
              y="-50%"
              height="200%"
              color-interpolation-filters="sRGB"
            >
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="3"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
                result="cm"
              />
            </filter>
            <filter
              id="goo-light"
              x="-50%"
              width="200%"
              y="-50%"
              height="200%"
              color-interpolation-filters="sRGB"
            >
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="1.25"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
                result="cm"
              />
            </filter>
            <filter
              id="goo-big"
              x="-50%"
              width="200%"
              y="-50%"
              height="200%"
              color-interpolation-filters="sRGB"
            >
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="7"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
                result="cm"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
    }
  `,
  styleUrl: 'array-object.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    KeyValuePipe,
    IonicModule,
    forwardRef(() => ObjectFieldsComponent),
    ControlFieldComponent,
    CdkDragHandle,
    CdkDropList,
    CdkDrag
  ],
})
export class ArrayObjectComponent<T> {
  @Input() fieldMode: FieldMode = FieldMode.LIVE;
  @Input() arrayObject!: { [key: string]: ArrayObject<T> };
  @Input() formGroup!: FormGroup | any;
  readonly controlType = ControlType;
  constructor() {
   
  }

  addItem() {
    const formArray = this.formGroup as FormArray;
    const d = Object.values(this.arrayObject).reduce(
      (pre, curr) => ({
        ...pre,
        [curr.name]: toValueDefault(curr),
      }),
      {}
    );
    console.log(d);
    formArray.push(toFormGroup(d));
  }
  removeItem(index: number) {
    const formArray = this.formGroup as FormArray;
    formArray.removeAt(index);
  }
  orderOriginal = () => 0;

  drop(event: any) {
    const formArray = this.formGroup.controls as FormGroup[];
    moveItemInArray(formArray, event.previousIndex, event.currentIndex);
    this.formGroup.controls = formArray; // Cập nhật lại thứ tự controls
  }
}
