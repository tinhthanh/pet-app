import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormLoginComponent } from '../form-login/form-login.component';
import { FormForgotComponent } from '../form-forgot/form-forgot.component';
import { FormRegisterComponent } from '../form-register/form-register.component';
import { FormOtpComponent } from '../form-otp/form-otp.component';
import { AuthService } from 'src/app/auth/auth.service';
import { IonToast } from '@ionic/angular/standalone';
import { take } from 'rxjs';
import { FormChangePassComponent } from '../form-change-pass/form-change-pass.component';
import { BtnCloseComponent } from '../btn-close/btn-close.component';

export enum OnBoardStep {
  login = 'login',
  register = 'register',
  forgot = 'forgot',
  verify = 'verify',
  changePass = 'changePass',
}
@Component({
    selector: 'app-form-compile-onboard',
    templateUrl: './form-compile-onboard.component.html',
    styleUrls: ['./form-compile-onboard.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        IonToast,
        FormLoginComponent,
        FormForgotComponent,
        FormRegisterComponent,
        FormOtpComponent,
        FormChangePassComponent,
        BtnCloseComponent
    ]
})
export class FormCompileOnboardComponent {
  readonly OnBoardStep = OnBoardStep;
  readonly auth = inject(AuthService);
  readonly loading = signal(false);
  isToastOpen = signal(false);
  message = signal('');
  step = signal(OnBoardStep.login);
  code = '';
  userReregister!: { name: string; email: string; password: string } | null;
  constructor() {}
  nextStep(step: OnBoardStep) {
    this.step.set(step);
  }
  signIn(data: { email: string; password: string }) {
    if (data.email && data.password) {
      this.loading.set(true);
      this.auth
        .signIn(data.email, data.password)
        .pipe(take(1))
        .subscribe((rs) => {
          this.loading.set(false);
          if (rs.status !== 200) {
            this.isToastOpen.set(true);
            if (rs.errors) {
              this.message.set(rs.errors['message']);
            }
          }
        });
    }
  }
  changePass(data: {  password: string }) {
    console.log(data);
    // CALL API CHANGE PASSWORD
    // email
    //TODO change password
  }
  signUp(data: { name: string; email: string; password: string }) {
    if (data.name && data.email && data.password) {
      this.loading.set(true);
      this.auth.isExist(data.email).then(rs => {
        this.loading.set(false);
          if (rs.status === 200) {
            this.isToastOpen.set(true);
            this.message.set('Email exist');
          }  else {
            this.userReregister = data;
            this.nextStep(OnBoardStep.register);
            const fb  = ( code: string ) => { this.code =  code; return this.code };
            this.auth.sendOtp(data.email, fb).then();
            this.nextStep(OnBoardStep.verify);
          }
      })
    }
  }
  register(data: { name: string; email: string; password: string }) {
    if (data.name && data.email && data.password) {
      this.loading.set(true);
      this.auth
        .signUp(data.name, data.email, data.password)
        .pipe(take(1))
        .subscribe((rs) => {
          this.loading.set(false);
          if (rs.status !== 200) {
            this.isToastOpen.set(true);
            this.userReregister = null;
            if (rs.errors) {
              this.message.set(rs.errors['message']);
            }
          }
        });
    }
  }
  checkExits($event: { email: string }) {
    if ($event.email) {
      this.loading.set(true);
      this.auth
        .isExist($event.email)
        .then((rs) => {
          this.loading.set(false);
          if (rs.status !== 200) {
            this.loading.set(false);
            this.isToastOpen.set(true);
            this.message.set('Email does not exist');
          } else {
            const fb  = ( code: string ) => { this.code =  code; return this.code };
            this.auth.sendOtp($event.email, fb).then();
            this.nextStep(OnBoardStep.verify);
          }
        });
    }
  }
  verify($event: string) {
    if($event === this.code) {
      if(this.userReregister) {
        this.register(this.userReregister);
      } else {
        this.loading.set(true);
        setTimeout(() => {
          this.loading.set(false);
          this.nextStep(OnBoardStep.changePass);
        }, 1000)
      }
    } else {
      this.isToastOpen.set(true);
      this.message.set('Code is wrong');
    }
  }
  closeForm() {
    this.auth.close();
  }
}
