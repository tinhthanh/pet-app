import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { IonIcon,IonSpinner } from '@ionic/angular/standalone';
import { OnBoardStep } from '../form-compile-onboard/form-compile-onboard.component';
import { addIcons } from 'ionicons';
import { eye, eyeOff, textOutline }  from 'ionicons/icons';
@Component({
  selector: 'app-form-change-pass',
  templateUrl: './form-change-pass.component.html',
  styleUrls: ['../form.scss', './form-change-pass.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonSpinner, IonIcon, ReactiveFormsModule, NgClass]
})
export class FormChangePassComponent {
  maskPassword = signal(false);
  readonly OnBoardStep = OnBoardStep;
  @Input() loading = false;
  @Output() nextStep = new EventEmitter<OnBoardStep>();
  @Output() vgSubmit = new EventEmitter<{ password: string;}>();

  form = new FormGroup({
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
        password : data.password || ''
      }
      this.vgSubmit.emit(user);
    }
  }

}
