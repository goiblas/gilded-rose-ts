import { ProductFactory } from "./products"

export interface Product {
    quality: number
    sellIn: number
    update(): Product
}

export class Item {
    constructor(
        public name: string,
        public sellIn: number, 
        public quality: number
    ) {}
}

export enum Special_Products {
    Aged_Brie = "Aged Brie",
    Sulfuras = "Sulfuras, Hand of Ragnaros",
    Backstage_pass = "Backstage passes to a TAFKAL80ETC concert",
    Conjured = "Conjured Mana Cake"
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        this.items = this.items.map( (item) => {
            const product = new ProductFactory(item).create()
            const { quality, sellIn } = product.update()
            return {...item, quality, sellIn }
        })
    }
}
