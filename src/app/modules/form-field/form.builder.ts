import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { ArrayObject, ControlType, IField, ObjectFields } from "./form.field";
import { ValidatorStr } from './form.validation';
export type BuilderType<T> = keyof T;
export type FormType<T extends Record<string, any>> = FormGroup<ControlsOf<T>>;
export type ValidatorType =
  | ValidatorStr
  | ValidatorFn[]
  | ((control: AbstractControl<any, any>) => ValidationErrors | null);
export type ControlsOf<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends Date
    ? FormControl<Date | null>
    : T[K] extends string[]
    ? FormArray<FormControl<string>>
    : T[K] extends (infer U extends Record<string, any>)[]
    ? FormArray<FormType<U>>
    : T[K] extends Record<any, any>
    ? FormType<T[K]>
    : FormControl<T[K]>;
};
export type FormModel<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends (infer U)[]
    ? ArrayObject<U>: T[K] extends Record<any, any> ? ObjectFields<T[K]>
    : IField;
}
export const toFormGroup = (data: any): FormGroup | FormArray | FormControl => {
  if (Array.isArray(data)) {
    return new FormArray(data.map((item) => toFormGroup(item)));
  }
  if (typeof data === 'object' && data !== null) {
    const formGroupContent: any = {};
    for (const [key, value] of Object.entries(data)) {
      formGroupContent[key] = toFormGroup(value);
    }
    return new FormGroup(formGroupContent);
  }
  return new FormControl(data);
};
export const toValueDefault = <T>(input: any) => {
  if (input.type === ControlType.ArrayObject) {
    const rs: any = {};
    rs[input.name] = [];
    return [];
  }
  if (input.type === ControlType.ObjectFields) {
    const result: any = {};
   Object.values(input.property).forEach((field: any) => {
      result[field.name] = toValueDefault(field);
    });
    return result;
  } else {
    return null;
  }
};
export const getDefaultModel = (data: any) => ({ [data.name]: toValueDefault(data) });

export const toValueValidForm = <T>(formGroup: FormGroup | FormArray): T => {
  if (formGroup instanceof FormArray) {
    return formGroup.controls.map((control) =>
      toValueValidForm(control as any)
    ) as any;
  }
  const values: any = {};
  Object.keys(formGroup.controls).forEach((key) => {
    const control = formGroup.get(key);
    if (control instanceof FormGroup || control instanceof FormArray) {
      values[key] = toValueValidForm(control);
    } else {
      const valueC = control as FormControl;
      if (valueC.disabled) {
        values[key] = valueC.value;
      } else {
        values[key] = valueC.valid ? valueC.value : null;
      }
    }
  });
  return values as T;
};
