import {Product} from "../gilded-rose"

export class DefaultProduct implements Product {

    protected MAX_QUALITY = 50

    constructor(
        public sellIn: number,
        public quality: number
    ) {}
    
    protected isOutOfDate(): boolean {
        return this.sellIn <= 0
    }
    protected updateQuality(value: number) {
        if(value >= 0 && value <= this.MAX_QUALITY) {
            this.quality = value
        }
    }
    protected updateSellIn(value: number) {
            this.sellIn = value
    }
    update(): DefaultProduct {
        if(this.isOutOfDate()) {
            this.updateQuality( this.quality - 2 )
        } else {
            this.updateQuality( this.quality - 1 )
        }
        this.updateSellIn(this.sellIn - 1)

        return this
    }
}
