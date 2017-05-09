import {Component, Input} from '@angular/core';

@Component({
    selector: 'btn-start',
    templateUrl: 'btn-start.component.html'
})
export class BtnStartComponent {
    @Input() isPlaying: boolean;
}
