import Result from "./Result";

export default class MAPResult extends Result {

    MAP: number;

    constructor(MAP: number, timeSpan: number) {
        super(timeSpan);
        this.MAP = MAP;
    }
}