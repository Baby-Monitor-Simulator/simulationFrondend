import FMPResult from "./results/FMPResult";

/**
 * Represents a response object containing user information and FMP results.
 * @property {string} userId - The unique identifier of the user.
 * @property {FMPResult} fmp - The FMP result data.
 */
export default class Response {
    userId: string | undefined;
    fmp: FMPResult | undefined;

    /**
     * Creates a new Response instance.
     * 
     * @param {string} userId - The unique identifier of the user.
     * @param {FMPResult} fmp - The FMP result data.
     */
    constructor(userId: string, fmp: FMPResult) {
        this.userId = userId;
        this.fmp = fmp;
    }
}