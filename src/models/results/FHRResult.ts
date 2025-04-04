import Result from "./Result";

/**
 * Represents a fetal heart rate result.
 * Extends the base Result class with heart rate specific data.
 * @property {number} heartRate - The fetal heart rate value in beats per minute.
 */
export default class FHRResult extends Result {

    heartRate: number;

    /**
     * Creates a new FHRResult instance.
     * 
     * @param {number} heartRate - The fetal heart rate value in beats per minute.
     * @param {number} timeSpan - The time span of the result in milliseconds.
     */
    constructor(heartRate: number, timeSpan: number) {
        super(timeSpan);
        this.heartRate = heartRate;
    }
}