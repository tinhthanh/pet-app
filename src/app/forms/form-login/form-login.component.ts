import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { IonIcon,IonSpinner } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { eye, eyeOff }  from 'ionicons/icons';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { OnBoardStep } from '../form-compile-onboard/form-compile-onboard.component';
@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['../form.scss', './form-login.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonSpinner, IonIcon, ReactiveFormsModule, NgClass]
})
export class FormLoginComponent {
  readonly OnBoardStep = OnBoardStep;
  @Input() loading = false;
  @Output() nextStep = new EventEmitter<OnBoardStep>();
  @Output() vgSubmit = new EventEmitter<{ email: string; password: string }>();
  form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });
  maskPassword = signal(false);
  constructor() {
    addIcons({
      'eye': eye,
      'eye-off': eyeOff
    })
   }
  updateMask(value: boolean) {
    this.maskPassword.set(value);
  }
  login() {
    if (this.form.valid) {
    const data = this.form.getRawValue();
      const user = {
        email : data.email ||'',
        password : data.password || ''
      }
      this.vgSubmit.emit(user);
    }
  }
}
