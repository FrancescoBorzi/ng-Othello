import {Component} from '@angular/core';
import {OthelloHandlerService} from "./othello-handler.service";
import {OthelloAIService} from "./othello-ai.service";

@Component({
    selector: 'othello',
    templateUrl: 'othello.component.html'
})
export class OthelloComponent {

    private handler: OthelloHandlerService;
    private ai: OthelloAIService;

    private turn: number;
    private matrix: number[][];
    private endingAnimation: {label: string, cssClass: string};
    private scoreWhite: number;
    private scoreBlack: number;
    private playing: boolean;

    constructor(OthelloHandlerService: OthelloHandlerService, OthelloAIService: OthelloAIService) {
        this.handler = OthelloHandlerService;
        this.ai = OthelloAIService;
    }

    /**
     * Automatically called when the component is initialised
     */
    ngOnInit() {
        this.matrix = [];

        this.turn = 1;

        this.endingAnimation = {
            cssClass: 'win_disable',
            label: ''
        };

        this.scoreWhite = 0;
        this.scoreBlack = 0;
        this.playing = false;
    }

    startGame(): void {

        for (let x = 0; x < 10; x++) {
            this.matrix[x] = [];
            for (let y = 0; y < 10; y++) {
                this.matrix[x][y] = 0;
            }
        }

        this.matrix[4][4] = 1;
        this.matrix[4][5] = 2;
        this.matrix[5][4] = 2;
        this.matrix[5][5] = 1;

        this.scoreBlack = this.handler.calculateScore(this.matrix, 1);
        this.scoreWhite = this.handler.calculateScore(this.matrix, 2);

        this.turn = 1;

        this.endingAnimation.label = '';
        this.endingAnimation.cssClass = 'win_disable';

        this.playing = true;
    }

    endGame(): void {
        if (this.scoreWhite > this.scoreBlack) {
            this.endingAnimation.label = "White wins!";
            this.endingAnimation.cssClass = "win_white";
        }
        else if (this.scoreBlack > this.scoreWhite) {
            this.endingAnimation.label = "Black wins!";
            this.endingAnimation.cssClass = "win_black";
        }
        else {
            this.endingAnimation.label = "Draw!";
            this.endingAnimation.cssClass = "win_white";
        }

        this.playing = false;
    }

    select(coord: Coord): void {

        if (this.turn == 1) {

            if (typeof this.matrix[coord.x] === 'undefined') {
                return;
            }

            if (!this.handler.stepControl(this.matrix, coord.x, coord.y, 1)) {
                return;
            }

            this.handler.stepProcess(this.matrix, coord.x, coord.y, 1);
            this.scoreBlack = this.handler.calculateScore(this.matrix, 1);
            this.scoreWhite = this.handler.calculateScore(this.matrix, 2);
            this.turn = 2;

            setTimeout(() => {
                this.cpuMove();
            }, 1000);
        }
    }

    cpuMove(): void {
        let playerMove: Coord|null;

        if (this.turn == 2) {
            let move = this.ai.calculateMove(this.matrix, 2);

            if (!move) {
                this.turn = 1;
                playerMove = this.ai.calculateMove(this.matrix, 1);

                if (!playerMove)
                    this.endGame();

                return;
            }

            this.handler.stepProcess(this.matrix, move.x, move.y, 2);
            this.scoreBlack = this.handler.calculateScore(this.matrix, 1);
            this.scoreWhite = this.handler.calculateScore(this.matrix, 2);
            this.turn = 1;

            playerMove = this.ai.calculateMove(this.matrix, 1);
            while (!playerMove) {
                move = this.ai.calculateMove(this.matrix, 2);

                if (!move) {
                    this.endGame();
                    return;
                }

                this.handler.stepProcess(this.matrix, move.x, move.y, 2);
                this.scoreBlack = this.handler.calculateScore(this.matrix, 1);
                this.scoreWhite = this.handler.calculateScore(this.matrix, 2);

                playerMove = this.ai.calculateMove(this.matrix, 1)
            }
        }
    }
}
