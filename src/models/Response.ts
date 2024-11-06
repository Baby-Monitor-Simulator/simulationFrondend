import FMPResult from "./results/FMPResult";

export default class Response {

    userId: string | undefined;
    fmp: FMPResult | undefined;

    constructor(userId: string, fmp: FMPResult) {
        this.userId = userId;
        this.fmp = fmp;
    }
}