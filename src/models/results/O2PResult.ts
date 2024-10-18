import Result from "./Result";

export default class O2PResult extends Result {

    o2Pressure: Number;

    constructor(o2Pressure: Number, timeSpan: Number) {
        super(timeSpan);
        this.o2Pressure = o2Pressure;
    }
}