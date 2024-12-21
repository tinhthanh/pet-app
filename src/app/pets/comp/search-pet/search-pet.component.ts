import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-pet',
  templateUrl: './search-pet.component.html',
  styleUrls: ['./search-pet.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPetComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
