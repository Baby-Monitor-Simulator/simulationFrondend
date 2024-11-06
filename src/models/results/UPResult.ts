import Result from "./Result";

export default class UPResult extends Result {

    uPressure: number;

    constructor(uPressure: number, timeSpan: number) {
        super(timeSpan);
        this.uPressure = uPressure;
    }
}