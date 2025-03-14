/**
 * Base class for all result types.
 * Provides common properties and functionality for result objects.
 * @property {number} timeSpan - The time span of the result in milliseconds.
 */
export default class Result {
    timeSpan: number;

    /**
     * Creates a new Result instance.
     * 
     * @param {number} timeSpan - The time span of the result in milliseconds.
     */
    constructor(timeSpan: number) {
        this.timeSpan = timeSpan;
    }
}