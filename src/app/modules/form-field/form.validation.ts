import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { IField } from './form.field';
import { isValid, parse } from 'date-fns';
import * as JSON5 from 'json5';
export enum ValidatorStr {
  required = 'required',
  minLength = 'minLength',
  maxLength = 'maxLength',
  email = 'email',
  min = 'min',
  max = 'max',
  phone = 'phone',
  date = 'date',
  dateTime = 'dateTime',
  json = 'json' // format la json

  // pattern = 'pattern',
  // requiredTrue = 'requiredTrue'

}
export type FnValidatorType = (field: IField) => ((control: AbstractControl) => ValidationErrors | null);
export const toValidator: Record<ValidatorStr,  FnValidatorType > = {
  [ValidatorStr.required]:
    (field: IField) =>
    (control: AbstractControl): ValidationErrors | null => {
      const errors = Validators.required(control);
      if (errors) {
        return {
          msg: `form.validators.required`,
          params: { label: field?.label || ''  },
        };
      }
      return null;
    },
  [ValidatorStr.maxLength]:
    (field: IField) =>
    (control: AbstractControl): ValidationErrors | null => {
    if (field.maxLength) {
      const errors = Validators.maxLength(field.maxLength)(control);
      // {maxlength: {requiredLength: 5, actualLength: 7}
      if (errors) {
        return {
          msg: `form.validators.maxLength`,
          params: (errors['maxlength'] || {}),
        };
      }
    }
      return null;
    },
  [ValidatorStr.minLength]:
    (field: IField) =>
    (control: AbstractControl): ValidationErrors | null => {
      if(field.minLength) {
        const errors = Validators.minLength(field.minLength)(control);
        // {minlength: {requiredLength: 3, actualLength: 2}}
        if (errors) {
          return {
            msg: `form.validators.minLength`,
            params: (errors['minlength'] || {}),
          };
        }
      }

      return null;
    },
  [ValidatorStr.email]:
    (field: IField) =>
    (control: AbstractControl): ValidationErrors | null => {
      const errors = Validators.email(control);
      if (errors) {
        return { msg: `form.validators.email` };
      }
      return null;
    },
  [ValidatorStr.min]:
    (field: IField) =>
    (control: AbstractControl): ValidationErrors | null => {
     if(field.min) {
       const errors = Validators.min(field.min)(control);
       //  {min: {min: 3, actual: 2}}
       if (errors) {
         return {
           msg: `form.validators.min`,
           params: { label: field.label, ...(errors['min'] || {}) },
         };
       }
     }
      return null;
    },
  [ValidatorStr.max]:
    (field: IField) =>
    (control: AbstractControl): ValidationErrors | null => {
     if(field.max) {
       const errors = Validators.max(field.max)(control);
       // {max: {max: 15, actual: 16}}
       if (errors) {
         return {
           msg: `form.validators.max`,
           params: { label: field.label, ...(errors['max'] || {}) },
         };
       }
     }
      return null;
    },
  [ValidatorStr.phone]:
    (field: IField) =>
    (control: AbstractControl): ValidationErrors | null => {
      const errors = phoneValid(control);
      if (errors) {
        return { msg: `form.validators.phone` };
      }
      return null;
    },
  [ValidatorStr.date]:
    (field: IField) =>
    (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      return parseDateMask(control.value) !== null
        ? null
        : { msg: `form.validators.date`, params: { label: field.label } };
    },
  [ValidatorStr.dateTime]:
    (field: IField) =>
    (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      if (
        control.value &&
        !isValid(parse(control.value, 'dd/MM/yyyy HH:mm', new Date()))
      ) {
        return { msg: `form.validators.dateTime`, params: { label: field.label } };
      }
      return null;
    },
    [ValidatorStr.json]:
    (field: IField) =>
    (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      } else {
        try {
          const data = JSON5.parse((control.value ||'')); 
          console.log(data);
          return null;
        } catch ( error) {
          return { msg: `form.validators.json` };
        }
      }
      return null;
    },
  // [ValidatorStr.requiredTrue]: Validators.requiredTrue,
  // [ValidatorStr.pattern]: Validators.pattern,
};
const parseDateMask = (dateString: string): Date | null => {
  if ((dateString || '').length !== 10) {
    return null;
  }
  const day = parseInt(dateString.substring(0, 2), 10);
  const month = parseInt(dateString.substring(3, 5), 10) - 1; // month is zero-based in Date object
  const year = parseInt(dateString.substring(6, 10), 10);
  const parsedDate = new Date(year, month, day);
  if (
    parsedDate.getDate() === day &&
    parsedDate.getMonth() === month &&
    parsedDate.getFullYear() === year
  ) {
    return parsedDate;
  }
  return null;
};

 const phoneValid =  (control: AbstractControl): { [key: string]: any } | null => {
  if(control.value === null || control.value === '') return null;
  return /((09|03|07|08|05)+([0-9]{8})\b)/g.test((control.value || '').replace(/[().]/g, ""))  || /((02)+([0-9]{9})\b)/g.test((control.value || '').replace(/[().]/g, ""))
    ? null : {invalid: control.value }
}
