import FMPResult from "./results/FMPResult";

export default class Response {

    userId: String | undefined;
    fmp: FMPResult | undefined;

    constructor(userId: String, fmp: FMPResult) {
        this.userId = userId;
        this.fmp = fmp;
    }
}