import {
  AbstractControl,
  ControlValueAccessor,
  FormGroupDirective,
  NG_VALUE_ACCESSOR
} from "@angular/forms";
import {
  Component,
  forwardRef,
  Input,
  ChangeDetectionStrategy,
  Type, ViewChild
} from "@angular/core";
import { FieldMode, IField,cpRegister } from '../form.field';
import {ViewContainerRef} from '@angular/core';
@Component({
  selector: 'app-control-field',
  standalone: true,
  template: `<ng-container #vcr></ng-container>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ControlFieldComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlFieldComponent implements ControlValueAccessor {
  @ViewChild('vcr', { static: true, read: ViewContainerRef })
  vcr!: ViewContainerRef;
 _field: IField | undefined;
  cp!: Type<any> ;
  @Input() set field(field: IField ) {
    if(field) {
      this._field = field;
      // @ts-ignore
      this.cp = cpRegister[field.type] ;
      this.vcr.clear();
    const instance =  this.vcr.createComponent(this.cp).instance;
     Object.assign(instance, {field: this._field,mode: this.mode,control:this.formControl});
    }
  };
  @Input() mode = FieldMode.LIVE;
  // _value: string | number | Date = '';
  constructor( private formGroupDirective: FormGroupDirective) {}
  get formControl(): AbstractControl | any {
    return this.formGroupDirective.control.get(this._field!!.name);
  }
  onChange = (_: any) => {};
  onTouched = () => {};
  writeValue(value: any) {}
  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
