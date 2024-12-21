import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-short-link',
  templateUrl: './short-link.component.html',
  styleUrls: ['./short-link.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShortLinkComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
