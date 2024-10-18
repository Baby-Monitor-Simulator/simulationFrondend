import Result from "./Result";

export default class MAPResult extends Result {

    MAP: Number;

    constructor(MAP: Number, timeSpan: Number) {
        super(timeSpan);
        this.MAP = MAP;
    }
}