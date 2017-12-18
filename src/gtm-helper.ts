/**
 * Simply an helper class.
 */
export class GtmHelper {

    /**
     * Constructor method.
     * 
     * @param debug 
     */
    constructor(private debug: boolean) {}

    /**
     * Log method.
     * 
     * Only logs when debug is true.
     * 
     * @param msgs you can pass one or more arguments.
     */
    log(...msgs: any[]) {
        if (!this.debug) return false;
        return console.log(msgs);
    }

    /**
     * Method to format price.
     * 
     * Replaces '€' for '' and ',' for '.'
     * 
     * @param num 
     */
    formatPrice(num: string) {
        this.log("Format price", num);
        num = num.replace('€', '').replace(',', '.').trim();
        num = parseFloat((Math.round(+num * 100) / 100).toString()).toFixed(2);
        this.log("Format price", num);
        return num;
    }



}