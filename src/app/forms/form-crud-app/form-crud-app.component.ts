import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { KeyValuePipe, NgClass, NgStyle } from '@angular/common';
import { StoreService } from '../../services/store.service';
import { ViewImgPipe } from 'src/app/pipes/view-img.pipe';
import { LoadingImgComponent } from 'src/app/ui';
import { IonSpinner } from "@ionic/angular/standalone";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppItem } from 'src/app/db/entitys';
import { PageUi } from 'src/app/builder/element.ui';
import * as JSON5 from 'json5';
@Component({
    selector: 'app-form-crud-app',
    templateUrl: './form-crud-app.component.html',
    styleUrls: ['../form.scss', './form-crud-app.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      IonSpinner,
      LoadingImgComponent,
      ReactiveFormsModule,
      NgClass,
      KeyValuePipe,
      NgStyle,
      ViewImgPipe
    ]
})
export class FormCrudAppComponent implements OnInit {
 readonly store = inject(StoreService);
 readonly loading = signal(false);
 form = new FormGroup({
  icon: new FormControl(''),
  name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
  description: new FormControl('', [Validators.maxLength(255)]),
  attributes: new FormControl(
    {
      '50': '#fcf5f4',
      '100': '#fae8e6',
      '200': '#f6d5d2',
      '300': '#efb7b2',
      '400': '#e48d85',
      '500': '#d6675d',
      '600': '#c4544a',
      '700': '#a23c33',
      '800': '#86352e',
      '900': '#70322c',
      '950': '#3c1613',
    }
  ),
  attributeDraw: new FormControl(`{
    '50': '#fcf5f4',
    '100': '#fae8e6',
    '200': '#f6d5d2',
    '300': '#efb7b2',
    '400': '#e48d85',
    '500': '#d6675d',
    '600': '#c4544a',
    '700': '#a23c33',
    '800': '#86352e',
    '900': '#70322c',
    '950': '#3c1613'
  }`)
})
@Input() data! : AppItem;
@Output() vgSubmit = new EventEmitter<
   AppItem
  >();
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log(file);
    // Automatically trigger the upload when the file is selected
    this.loading.set(true);
    this.store.uploadImage(file).subscribe((res) => {
      console.log(res);
      if(res.data.id) {
        this.form.controls.icon.setValue(res.data.id);
      }
      this.loading.set(false);
    })
  }

  constructor() {
    this.form.controls.attributeDraw.
    valueChanges.pipe(takeUntilDestroyed()).subscribe( item => {
      console.log(item);
      if(item) {
        try {
         const ob = validateColorPalette(item);
         if(ob) {
          this.form.controls.attributes.setValue(ob as any);
         }
        } catch (error) { }
      }
    })
  }
  ngOnInit(): void {
    if(this.data) {
      if(this.data.icon) {
        this.form.controls.icon.patchValue(this.data.icon);
      }
      if(this.data.name) {
        this.form.controls.name.patchValue(this.data.name);
      }
      if(this.data.description) {
         this.form.controls.description.patchValue(this.data.description);
      }
      if(this.data.attributes) {
        this.form.controls.attributeDraw.patchValue(JSON.stringify(this.data.attributes));
      }
    }
  }
  submit() {
    if(this.form.valid) {
      const draw = this.form.getRawValue();
      let pages = {};
      if(!this.data) {
        console.log('edit');
        pages =  {pages : {main: new PageUi({label: 'main',children:{}})}}
      }
      this.vgSubmit.emit({
        ...(this.data || {}),
        ...pages,
        icon: draw.icon ||'',
        name: draw.name || '',
        description: draw.description ||'',
        attributes: draw.attributes || {}
      });
      console.log(this.form.getRawValue());
    }
  }
  orderOriginal = () => 0;
}
type ColorPalette = {
  [key: string]: string;
}

const isValidCss = (type: keyof CSSStyleDeclaration) => (value: string): boolean  =>{
  const element = document.createElement('div');
  element.style[type as any] = value;
  return element.style[type] !== '';
}
 const validateColorPalette =(input: string): ColorPalette | null  => {
  let colorPalette: ColorPalette;
  try {
      // Thay thế ' = " và ép kiểu về object
      colorPalette = JSON5.parse(input.replace(/'/g, '"'));
  } catch (error) {
      console.error("Invalid input string. Please provide a valid JSON string.");
      return null;
  }
  // Kiểm tra màu hợp lệ bằng cách sử dụng isValidCss
  const validColorPalette: ColorPalette = {};
  for (const key in colorPalette) {
      const color = colorPalette[key];
      if (isValidCss('color')(color)) {
          validColorPalette[key] = color;
      }
  }
  return validColorPalette;
}
