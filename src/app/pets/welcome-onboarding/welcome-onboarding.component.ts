import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-onboarding',
  templateUrl: './welcome-onboarding.component.html',
  styleUrls: ['./welcome-onboarding.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeOnboardingComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
