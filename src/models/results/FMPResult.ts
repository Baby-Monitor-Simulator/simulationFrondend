import MAPResult from "./MAPResult";
import O2PResult from "./O2PResult";
import UPResult from "./UPResult";

export default class FHRResult {

    fhrResult: FHRResult;
    mapResult: MAPResult;
    o2pResult: O2PResult;
    upResult: UPResult;

    constructor(fhrResult: FHRResult, mapResult: MAPResult, o2pResult: O2PResult, upResult: UPResult) {
        this.fhrResult = fhrResult;
        this.mapResult = mapResult;
        this.o2pResult = o2pResult;
        this.upResult = upResult;
    }
}