import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IonSpinner} from '@ionic/angular/standalone'
import { OnBoardStep } from '../form-compile-onboard/form-compile-onboard.component';
import { Observable, map, takeUntil, timer } from 'rxjs';
@Component({
  selector: 'app-form-otp',
  templateUrl: './form-otp.component.html',
  styleUrls: ['../form.scss', './form-otp.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [IonSpinner, ReactiveFormsModule, NgClass]
})
export class FormOtpComponent  {
  readonly OnBoardStep = OnBoardStep;
  @Input() loading = false;
  @Output() vgSubmit = new EventEmitter<string>();
  @Output() nextStep = new EventEmitter<OnBoardStep>();
  otp = new FormControl('');
  count = toSignal(this.getTimer(2));
  constructor() {
    this.otp.valueChanges.pipe(takeUntilDestroyed()).subscribe(
      (otp) => {
        if(otp && (otp || '').length === 4) {
          this.vgSubmit.emit(otp);
        }
      }
    )
   }
    getTimer (m: number): Observable<string> {
    let distance =  (m * 60 * 1000) - 1000;
    return timer(0, 1000).pipe(
      takeUntil(timer(distance)),
      map(() => {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        distance -= 1000;
        return `${days ? days + 'd' : ''} ${hours ? hours + 'h' : ''} ${minutes ? minutes + 'm' : ''} ${seconds ? seconds + 's' : ''}`;
      })
    );
  };
}
