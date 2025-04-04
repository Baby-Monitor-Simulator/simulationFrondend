import Result from "./Result";

/**
 * Represents a uterine pressure result.
 * Extends the base Result class with uterine pressure specific data.
 * @property {number} uPressure - The uterine pressure value.
 */
export default class UPResult extends Result {

    uPressure: number;

    /**
     * Creates a new UPResult instance.
     * 
     * @param {number} uPressure - The uterine pressure value.
     * @param {number} timeSpan - The time span of the result in milliseconds.
     */
    constructor(uPressure: number, timeSpan: number) {
        super(timeSpan);
        this.uPressure = uPressure;
    }
}