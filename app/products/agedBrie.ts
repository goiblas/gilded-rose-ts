import { DefaultProduct } from "./default"

export class AgedBrie extends DefaultProduct {
    update() {
        if(this.isOutOfDate()) {
            this.updateQuality( this.quality + 2 )
        } else {
            this.updateQuality( this.quality + 1 )
        }
        this.updateSellIn(this.sellIn - 1)

        return this
    }
}
