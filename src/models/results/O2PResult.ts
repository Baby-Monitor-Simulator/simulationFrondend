import Result from "./Result";

/**
 * Represents an oxygen pressure result.
 * Extends the base Result class with oxygen pressure specific data.
 * @property {number} o2Pressure - The oxygen pressure value.
 */
export default class O2PResult extends Result {

    o2Pressure: number;

    /**
     * Creates a new O2PResult instance.
     * 
     * @param {number} o2Pressure - The oxygen pressure value.
     * @param {number} timeSpan - The time span of the result in milliseconds.
     */
    constructor(o2Pressure: number, timeSpan: number) {
        super(timeSpan);
        this.o2Pressure = o2Pressure;
    }
}