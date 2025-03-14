import Result from "./Result";

/**
 * Represents a mean arterial pressure result.
 * Extends the base Result class with MAP specific data.
 * @property {number} MAP - The mean arterial pressure value.
 */
export default class MAPResult extends Result {

    MAP: number;

    /**
     * Creates a new MAPResult instance.
     * 
     * @param {number} MAP - The mean arterial pressure value.
     * @param {number} timeSpan - The time span of the result in milliseconds.
     */
    constructor(MAP: number, timeSpan: number) {
        super(timeSpan);
        this.MAP = MAP;
    }
}