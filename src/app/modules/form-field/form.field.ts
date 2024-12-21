import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { ValidatorType } from './form.builder';
import { ValidatorStr } from './form.validation';
import { FieldComp } from "./control-field/fields/field-comp.directive";
import { Type } from "@angular/core";
import { TextFieldComponent } from "./control-field/fields/text-field/text-field.component";
import { SelectFieldComponent } from "./control-field/fields/select-field/select-field.component";
import { DateFieldComponent } from "./control-field/fields/date-field/date-field.component";
import { CheckboxFieldComponent } from "./control-field/fields/checkbox-field/checkbox-field.component";
import { RadioFieldComponent } from "./control-field/fields/radio-field/radio-field.component";
import { TextareaFieldComponent } from "./control-field/fields/textarea-field/textarea-field.component";
import { SwitchFieldComponent } from "./control-field/fields/switch-field/switch-field.component";
import { PhoneFieldComponent } from "./control-field/fields/phone-field/phone-field.component";
import { EmailFieldComponent } from "./control-field/fields/email-field/email-field.component";
import { NumberFieldComponent } from "./control-field/fields/number-field/number-field.component";
import { DateTimeFieldComponent } from "./control-field/fields/date-time/date-time-field.component";
import { ColorFieldComponent } from "./control-field/fields/color-field/color-field.componet";
import { ImageFieldComponent } from "./control-field/fields/image-field/image-field.component";
import { JsonFieldComponent } from "./control-field/fields/json-field/json-field.component";
export enum FieldMode {
  BUILDER = 'BUILDER',
  LIVE = 'LIVE',
}
export interface IField {
  required?: boolean;
  type: string;
  label?: string;
  placeholder?: string;
  name: string;
  value?: any;
  validators?:
    | ValidatorStr[]
    | ValidatorFn[]
    | ((control: AbstractControl<any, any>) => ValidationErrors | null)[]
    | null;
  options?: {
    label: string;
    value: string | number | object;
    disabled?: boolean;
  }[];
  searchable?: boolean;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  defaultValue?: any;
  minHeight?: number ;
  property?:  {[key: string]: IField };
  maxLength?: number | null;
  minLength?: number | null;
  min?: number;
  max?: number;
  classes?: string;
  onChange?: (field:IField , value: FormControl) => void ;
}
export enum ControlType {
  JsonField = 'json',
  Input = 'text',
  Select = 'select',
  Date = 'date',
  Checkbox = 'checkbox',
  Radio = 'radio',
  Textarea = 'textarea',
  Switch = 'switch',
  Phone = 'phone',
  email = 'email',
  inputNumber = 'number',
  dateTime = 'dateTime',

  image = 'image',

  color = 'color',

  ObjectFields = 'ObjectFields',
  ArrayObject = 'ArrayObject',
}
export const cpRegister: Record<ControlType, Type<FieldComp<IField>> | null > = {
  [ControlType.JsonField]: JsonFieldComponent,
  [ControlType.Input]: TextFieldComponent,
  [ControlType.Select]: SelectFieldComponent,
  [ControlType.Date] : DateFieldComponent,
  [ControlType.Checkbox]: CheckboxFieldComponent,
  [ControlType.Radio]: RadioFieldComponent,
  [ControlType.Textarea]: TextareaFieldComponent,
  [ControlType.Switch]: SwitchFieldComponent,
  [ControlType.Phone]: PhoneFieldComponent,
  [ControlType.email]: EmailFieldComponent,
  [ControlType.inputNumber]: NumberFieldComponent,
  [ControlType.dateTime]: DateTimeFieldComponent,
  [ControlType.color]: ColorFieldComponent,
  [ControlType.image]: ImageFieldComponent,
  [ControlType.ObjectFields]: null,
  [ControlType.ArrayObject]: null,
}

/**
 * Initializes a new instance of the constructor.
 *
 * @param {Object} options - The options for the constructor.
 * @param {string} options.name - The name of the constructor.
 * @param {string} [options.label] - The label of the constructor (optional).
 * @param {IField[]} [options.property] - The property of the constructor (optional).
 */
export class ArrayObject<T>{
  name = '';
  type: string = ControlType.ArrayObject;
  property?: { [K in keyof T]: IField };
  classes?: string;
  label?: string;
  constructor(options: {
      name: string;
      label?: string;
      classes?: string;
      property?: { [K in keyof T]: IField }
    }) {
    Object.assign(this, options);
  }
}
export class ObjectFields<T> {
  name = '';
  type: string = ControlType.ObjectFields;
  label?: string = '' ;
  property?: { [K in keyof T]: IField };
  constructor(options: {
  name: string; label?: string; property?: { [K in keyof T]: IField }, onChange?: (field: SelectField ,value: FormControl) => void; }) {
    Object.assign(this, options);
  }
}

export class PhoneField implements IField {
  name = '';
  type: string = ControlType.Phone;
  placeholder = '';
  label = '';
  required = false;
  classes?: string;
  onChange?: (field: IField ,value: FormControl) => void;
  constructor(options: {
    name: string;
    disabled?: boolean;
    label?: string;
    required?: boolean;
    placeholder?: string;
    classes?: string;
    onChange?: (field: PhoneField ,value: FormControl) => void;
  }) {
    Object.assign(this, options);
  }
}
export class InputNumberField implements IField {
  name = '';
  type: string = ControlType.inputNumber;
  placeholder = '';
  label = '';
  required = false;
  min = 0;
  max = 12;
  classes?: string;
  onChange?: (field: IField ,value: FormControl) => void;
  constructor(options: {
    name: string;
    disabled?: boolean;
    label?: string;
    required?: boolean;
    placeholder?: string;
    min?: number;
    max?: number;
    classes?: string;
    onChange?: (field: InputNumberField ,value: FormControl) => void;
  }) {
    Object.assign(this, options);
  }
}

export class SwitchBoxField implements IField {
  name = '';
  type: string = ControlType.Switch;
  label = '';
  classes?: string;
  onChange?: (field: IField ,value: FormControl) => void;
  constructor(options: {
    name: string;
    label?: string;
    required?: boolean;
    validators?: ValidatorType[] | null;
    classes?: string;
    onChange?: (field: SwitchBoxField ,value: FormControl) => void;
  }) {
    Object.assign(this, options);
  }
}
export class CheckBoxField implements IField {
  name = '';
  type: string = ControlType.Checkbox;
  label = '';
  classes?: string;
  onChange?: (field: IField ,value: FormControl) => void;
  constructor(options: {
    name: string;
    label?: string;
    required?: boolean;
    classes?: string;
    onChange?: (field: CheckBoxField ,value: FormControl) => void;
  }) {
    Object.assign(this, options);
  }
}
export class JsonField implements IField {
  required = false;
  name = '';
  type: string = ControlType.JsonField;
  label = '';
  placeholder = '';
  minHeight = 104;
  classes?: string;
  onChange?: (field: IField ,value: FormControl) => void ;
  constructor(options: {
    name: string;
    minHeight?: number;
    disabled?: boolean;
    label?: string;
    required?: boolean;
    placeholder?: string;
    classes?: string;
    onChange?: (field: JsonField ,value: FormControl) => void;
  }) {
    Object.assign(this, options);
  }
}

export class TextareaField implements IField {
  required = false;
  name = '';
  type: string = ControlType.Textarea;
  label = '';
  placeholder = '';
  minHeight = 104;
  maxLength = null;
  minLength = null;
  classes?: string;
  onChange?: (field: IField ,value: FormControl) => void ;
  constructor(options: {
    name: string;
    minHeight?: number;
    disabled?: boolean;
    label?: string;
    maxLength?: number;
    minLength?: number;
    required?: boolean;
    placeholder?: string;
    validators?: ValidatorType[] | null;
    classes?: string;
    onChange?: (field: TextareaField ,value: FormControl) => void;
  }) {
    Object.assign(this, options);
  }
}
export class RadioField implements IField {
  name = '';
  type: string = ControlType.Radio;
  options?: {
    label: string;
    value: string | number | object;
    disabled?: boolean;
  }[] = [];
  classes?: string;
  label = '';
  required?: boolean;
  onChange?: (field: IField ,value: FormControl) => void;
  constructor(options: {
    name: string;
    class?: string;
    label?: string;
    options: {
      label: string;
      value: string | boolean | number | object;
      disabled?: boolean;
    }[];
    required?: boolean;
    validators?: ValidatorType[] | null;
    classes?: string;
    onChange?: (field: RadioField ,value: FormControl) => void;
  }) {
    Object.assign(this, options);
  }
}
export class DateField implements IField {
  required = false;
  name = '';
  type: string = ControlType.Date;
  label = '';
  classes?: string;
  onChange?: (field: IField ,value: FormControl) => void;
  constructor(options: {
    name: string;
    label?: string;
    minDate?: Date;
    maxDate?: Date;
    disabled?: boolean;
    required?: boolean;
    validators?: ValidatorType[] | null;
    classes?: string;
    onChange?: (field: DateField ,value: FormControl) => void;
  }) {
    Object.assign(this, options);
  }
}
export class DateTimeField implements IField {
  required = false;
  name = '';
  type: string = ControlType.dateTime;
  label = '';
  classes?: string;
  onChange?: (field: IField ,value: FormControl) => void;
  constructor(options: {
    name: string;
    label?: string;
    minDate?: Date;
    maxDate?: Date;
    disabled?: boolean;
    required?: boolean;
    validators?: ValidatorType[] | null;
    classes?: string;
    onChange?: (field: DateTimeField ,value: FormControl) => void;
  }) {
    Object.assign(this, options);
  }
}
export class SelectField implements IField {
  name = '';
  type: string = ControlType.Select;
  options:{
    label: string;
    value: string | number | object;
    disabled?: boolean;
  }[] = [];
  multiple: boolean = false;
  label = '';
  required = false;
  classes?: string;
  placeholder = '';
  onChange?: (field: IField ,value: FormControl) => void;
  constructor(options: {
    name: string;
    options: {
      label: string;
      value: string | number | object;
      disabled?: boolean;
    }[];
    multiple?: boolean;
    disabled?: boolean;
    label?: string;
    required?: boolean;
    validators?: ValidatorType[] | null;
    classes?: string;
    placeholder?: string;
    onChange?: (field: SelectField ,value: FormControl) => void;
  }) {
    Object.assign(this, options);
  }
}
export class TextField implements IField {
  required = false;
  name = '';
  placeholder = '';
  type: string = ControlType.Input;
  maxLength = 255;
  minLength = null;
  label = '';
  classes?: string;
  onChange?: (field: IField ,value: FormControl) => void;
  constructor(options: {
    name: string;
    maxLength?: number;
    minLength?: number;
    disabled?: boolean;
    placeholder?: string;
    label?: string;
    required?: boolean;
    validators?: ValidatorType[] | null;
    classes?: string;
    onChange?: (field: TextField ,value: FormControl) => void;
  }) {
    Object.assign(this, options);
  }
}
export class EmailField implements IField {
  required = false;
  name = '';
  placeholder = '';
  type: string = ControlType.email;
  label = '';
  classes?: string;
  onChange?: (field: IField ,value: FormControl) => void;
  constructor(options: {
    name: string;
    disabled?: boolean;
    label?: string;
    required?: boolean;
    validators?: ValidatorType[] | null;
    classes?: string;
    placeholder?: string;
    onChange?: (field: EmailField ,value: FormControl) => void;
  }) {
    Object.assign(this, options);
  }
}
