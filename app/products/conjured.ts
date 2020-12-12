import { DefaultProduct } from "./default"

export class Conjured extends DefaultProduct {
    update() {
        if(this.isOutOfDate()) {
            this.updateQuality( this.quality - 4 )
        } else {
            this.updateQuality( this.quality - 2 )
        }
        this.updateSellIn(this.sellIn - 1)
        
        return this
    }
}