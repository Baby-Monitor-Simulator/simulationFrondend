import Result from "./Result";

export default class UPResult extends Result {

    uPressure: Number;

    constructor(uPressure: Number, timeSpan: Number) {
        super(timeSpan);
        this.uPressure = uPressure;
    }
}