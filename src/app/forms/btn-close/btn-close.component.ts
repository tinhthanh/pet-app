import { ChangeDetectionStrategy, Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'app-btn-close',
    styleUrl: 'btn-close.scss',
    templateUrl: 'btn-close.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BtnCloseComponent {
    @Output() vgClose = new EventEmitter<void>();
}