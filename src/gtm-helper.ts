/**
 * Helper class.
 */
export class GtmHelper {

    constructor(private debug: boolean) {}

    log(msg: string) {
        if (!this.debug) return false;
        return console.log(msg);
    }

    formatPrice(num: string) {
        num = num.replace('€', '').trim();
        return parseFloat((Math.round(+num * 100) / 100).toString()).toFixed(2);
    }

}