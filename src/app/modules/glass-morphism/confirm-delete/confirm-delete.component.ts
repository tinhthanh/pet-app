import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
export enum ActionType {
  CANCEL = 'cancel',
  OK = 'ok',
  CLOSE = 'close'
}
@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDeleteComponent {
  @Input() title = 'Delete file?';
  @Input() details = 'Do you want to delete the file?';
  readonly ActionType =  ActionType;
  @Output() vgEvent = new EventEmitter<ActionType>();
  constructor() { }


}
