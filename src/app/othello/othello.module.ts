import { NgModule } from '@angular/core';
import { OthelloAIService } from './othello-ai.service';
import { OthelloHandlerService } from './othello-handler.service';
import { BtnStartComponent } from './btn-start.component';
import { PlayerScoreComponent } from './player-score.component';
import { OthelloBoardComponent } from './othello-board.component';
import { OthelloComponent } from './othello.component';
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
    id: 'OthelloModule',
    declarations: [
        BtnStartComponent,
        PlayerScoreComponent,
        OthelloBoardComponent,
        OthelloComponent
    ],
    imports: [
      BrowserModule
    ],
    exports: [
      BtnStartComponent,
      PlayerScoreComponent,
      OthelloBoardComponent,
      OthelloComponent
    ],
    providers: [
        OthelloAIService,
        OthelloHandlerService
    ]
})
export class OthelloModule {}
