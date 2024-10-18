import Result from "./Result";

export default class FHRResult extends Result {

    heartRate: Number;

    constructor(heartRate: Number, timeSpan: Number) {
        super(timeSpan);
        this.heartRate = heartRate;
    }
}