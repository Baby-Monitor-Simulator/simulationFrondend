import Result from "./Result";

export default class O2PResult extends Result {

    o2Pressure: number;

    constructor(o2Pressure: number, timeSpan: number) {
        super(timeSpan);
        this.o2Pressure = o2Pressure;
    }
}