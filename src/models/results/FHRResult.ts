import Result from "./Result";

export default class FHRResult extends Result {

    heartRate: number;

    constructor(heartRate: number, timeSpan: number) {
        super(timeSpan);
        this.heartRate = heartRate;
    }
}