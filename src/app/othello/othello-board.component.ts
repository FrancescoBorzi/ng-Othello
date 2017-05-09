import {Component, Input, Output, EventEmitter} from '@angular/core';
import {OthelloHandlerService} from "./othello-handler.service";

@Component({
    selector: 'othello-board',
    templateUrl: 'othello-board.component.html'
})
export class OthelloBoardComponent {
    @Output() selection = new EventEmitter<Coord>();
    @Input() isPlaying: boolean;
    @Input() matrix: number[][];

    private highlights: boolean[];
    private handler: OthelloHandlerService;

    constructor(OthelloHandlerService: OthelloHandlerService) {

        this.handler = OthelloHandlerService;
    }

    /**
     * Automatically called when the component is initialised
     */
    ngOnInit() {
        this.highlights = [];
    }

    /**
     * Returns the css classes as string of the (x, y) position of the board
     *
     * @param x
     * @param y
     * @returns {any}
     */
    getClass(x: number, y: number): string {
        if (!this.isPlaying) {
            return 'disc-empty';
        }

        let classes;

        switch (this.matrix[x][y]) {
            case 1:
                classes = 'disc-black';
                break;
            case 2:
                classes = 'disc-white';
                break;
            default:
                classes = 'disc-empty';
        }

        if (this.highlights[this.matrix.length * x + y]) {
            classes += ' disc-suggestion';
        }

        return classes;
    }

    /**
     * Handles the event when the user clicks on the (x, y) position of the board
     *
     * @param x
     * @param y
     * @param id
     */
    click(x: number, y: number, id: number) {
        if (this.isPlaying) {
            if (this.handler.stepControl(this.matrix, x, y, id)) {
                // emit the selection event
                this.selection.emit({
                    x: x,
                    y: y
                });
            } else if (this.matrix[x][y] == 0) {
                // show suggestions
                let suggestions = this.handler.getSuggestions(this.matrix, id);
                for (let suggestionCoords of suggestions) {
                    this.highlights[this.matrix.length * suggestionCoords.x + suggestionCoords.y] = true;
                }
                setTimeout(() => {
                    // hide suggestions after a while
                    for (let suggestionCoords of suggestions) {
                        this.highlights[this.matrix.length * suggestionCoords.x + suggestionCoords.y] = false;
                    }
                }, 500);
            }
        }
    }
}
