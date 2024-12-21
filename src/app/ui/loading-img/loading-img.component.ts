import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-img',
  template: `<div class="loader"></div>`,
  styleUrls: ['./loading-img.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingImgComponent  {}
