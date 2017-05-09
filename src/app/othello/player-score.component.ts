import {Component, Input} from '@angular/core';

@Component({
    selector: 'player-score',
    templateUrl: 'player-score.component.html'
})
export class PlayerScoreComponent {
    @Input() playerId: number;
    @Input() score: number;
}
