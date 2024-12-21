import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
  selector: 'app-bsc-clinc',
  templateUrl: 'bsc-clinc.component.html',
  styleUrl: 'bsc-clinc.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BscClincComponent {
  urlBsc: string = '' ;
  @Input() set breed(b: string) {
      if(b) {
        if(b === 'cho') {
          this.urlBsc = 'assets/pets/BCS-DOG.png';
        }
        if(b ==='meo') {
          this.urlBsc = 'assets/pets/BCS-CAT.png';
        }
      }
  }

}
