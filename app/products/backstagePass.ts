import { DefaultProduct } from "./default"

export class BackstagePass extends DefaultProduct {
    DAYS_FOR_PROXIMITY_SALE: number = 10
    DAYS_FOR_LAST_MINUTE_SALE: number = 5

    private concertDateIsClose():boolean{
        return this.sellIn <= this.DAYS_FOR_PROXIMITY_SALE && this.sellIn > this.DAYS_FOR_LAST_MINUTE_SALE
    }
    private concertDateIsLastMinute():boolean{
        return this.sellIn > 0 && this.sellIn <= this.DAYS_FOR_LAST_MINUTE_SALE
    }

    getQualityToAdd() {
        if(this.concertDateIsClose()) return 2
        if( this.concertDateIsLastMinute())  return 3
        return 1
    }
    update() {

         if(this.isOutOfDate()) {
            this.updateQuality( 0 )
         } else {
             this.updateQuality( this.quality + this.getQualityToAdd())
         }
        this.updateSellIn(this.sellIn - 1)
        return this
    }
}