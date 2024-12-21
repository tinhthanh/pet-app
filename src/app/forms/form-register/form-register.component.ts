import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { IonIcon,IonSpinner } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { eye, eyeOff, textOutline }  from 'ionicons/icons';
import { OnBoardStep } from '../form-compile-onboard/form-compile-onboard.component';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['../form.scss', './form-register.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonSpinner, IonIcon, ReactiveFormsModule, NgClass]
})
export class FormRegisterComponent {
  maskPassword = signal(false);
  readonly OnBoardStep = OnBoardStep;
  @Input() loading = false;
  @Output() nextStep = new EventEmitter<OnBoardStep>();
  @Output() vgSubmit = new EventEmitter<{ name: string; email: string; password: string;}>();

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  }, { validators:  (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ notSame: true });
    }
    return null;
  } });
  constructor() {
    addIcons({
      'eye': eye,
      'eye-off': eyeOff,
      'text-outline': textOutline
    })
  }
  updateMask(value: boolean) {
    this.maskPassword.set(value);
  }
  register() {
    if (this.form.valid) {
      const data = this.form.getRawValue();
      const user = {
        name : data.name ||'',
        email : data.email ||'',
        password : data.password || ''
      }
      this.vgSubmit.emit(user);
    }
  }
}
