import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ShortLinkComponent } from "./short-link/short-link.component";

@Component({
    selector: 'app-pet-card',
    templateUrl: './pet-card.component.html',
    styleUrls: ['./pet-card.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ShortLinkComponent]
})
export class PetCardComponent  implements OnInit {
  @Output() vgViewDetails = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {}

}
