import { Item, Special_Products } from "./../gilded-rose"
import { DefaultProduct } from "./default"
import { AgedBrie } from "./agedBrie"
import { Conjured } from "./conjured"
import { BackstagePass } from "./backstagePass"
import { Sulfuras } from "./sulfuras"

export class ProductFactory {
    constructor(private item: Item){}
    create(){
        switch (this.item.name) {
            case Special_Products.Aged_Brie:
                return new AgedBrie( this.item.sellIn, this.item.quality )
            
            case Special_Products.Aged_Brie:
                return new AgedBrie(this.item.sellIn, this.item.quality)
            
            case Special_Products.Sulfuras:
                return new Sulfuras(this.item.sellIn, this.item.quality)

            case Special_Products.Backstage_pass:
                return new BackstagePass(this.item.sellIn, this.item.quality)
                
            case Special_Products.Conjured:
                return new Conjured(this.item.sellIn, this.item.quality)

            default:
                return new DefaultProduct(this.item.sellIn, this.item.quality)
        }
    }
}