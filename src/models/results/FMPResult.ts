import MAPResult from "./MAPResult";
import O2PResult from "./O2PResult";
import UPResult from "./UPResult";

/**
 * Represents a collection of fetal health monitoring results.
 * Contains various result types related to fetal monitoring parameters.
 * @property {FHRResult} fhrResult - The fetal heart rate result.   
 * @property {MAPResult} mapResult - The mean arterial pressure result.
 * @property {O2PResult} o2pResult - The oxygen perfusion result.
 * @property {UPResult} upResult - The uterine pressure result.
 */
export default class FHRResult {

    fhrResult: FHRResult;
    mapResult: MAPResult;
    o2pResult: O2PResult;
    upResult: UPResult;

    /**
     * Creates a new FHRResult instance.
     * 
     * @param {FHRResult} fhrResult - The fetal heart rate result.
     * @param {MAPResult} mapResult - The mean arterial pressure result.
     * @param {O2PResult} o2pResult - The oxygen perfusion result.
     * @param {UPResult} upResult - The uterine pressure result.
     */
    constructor(fhrResult: FHRResult, mapResult: MAPResult, o2pResult: O2PResult, upResult: UPResult) {
        this.fhrResult = fhrResult;
        this.mapResult = mapResult;
        this.o2pResult = o2pResult;
        this.upResult = upResult;
    }
}