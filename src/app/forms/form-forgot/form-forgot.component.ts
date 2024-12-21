import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OnBoardStep } from '../form-compile-onboard/form-compile-onboard.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { IonSpinner } from '@ionic/angular/standalone'
@Component({
  selector: 'app-form-forgot',
  templateUrl: './form-forgot.component.html',
  styleUrls: ['../form.scss', './form-forgot.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ ReactiveFormsModule, NgClass, IonSpinner]
})
export class FormForgotComponent  {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })
  readonly OnBoardStep = OnBoardStep;
  @Input() loading = false;
  @Output() nextStep = new EventEmitter<OnBoardStep>();
  @Output() vgSubmit = new EventEmitter<{ email: string }>();
  sendEmail() {
    if(this.form.valid) {
      const email = this.form.controls.email.value || '';
      this.vgSubmit.emit({email});
    }
  }
}
