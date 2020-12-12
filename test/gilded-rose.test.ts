import { Item, GildedRose } from "../app/gilded-rose";

enum Products {
  Aged_Brie = "Aged Brie",
  Sulfuras = "Sulfuras, Hand of Ragnaros",
  Backstage_pass = "Backstage passes to a TAFKAL80ETC concert",
  Conjured = "Conjured Mana Cake"
}

describe("Productos", () => {
  it("Propiedades del producto", function () {
    const item = new Item("foo", 1, 0 )

    expect(item.name).toBe("foo")
    expect(item.sellIn).toBe(1)
    expect(item.quality).toBe(0)
  })

  it("La `calidad` de un artículo nunca es mayor a `50`", function () {
    const agedBrie = new Item(Products.Aged_Brie, 0, 50 )
    const store = new GildedRose([agedBrie])

    store.updateQuality()
    
    expect(store.items[0].quality).toBe(50)
  })
  
  describe("Queso Brie", () => {
    it(" El Queso Brie envejecido (`Aged brie`) incrementa su `calidad` a medida que se pone viejo, Su `calidad` aumenta en `1` unidad cada día", function () {
      const agedBrie = new Item(Products.Aged_Brie, 1, 10 )
      const store = new GildedRose([agedBrie])

      store.updateQuality()
      
      expect(store.items[0].quality).toBe(11)
    })
    it(" El Queso Brie envejecido (`Aged brie`) incrementa su `calidad` a medida que se pone viejo, luego de la `fecha de venta` su `calidad` aumenta `2` unidades por día", function () {
      const agedBrie = new Item(Products.Aged_Brie, 0, 10 )
      const store = new GildedRose([agedBrie])

      store.updateQuality()
      
      expect(store.items[0].quality).toBe(12)
    })
  })

  describe("Sulfuras", () => {
    it("El artículo Sulfuras, no modifica su `fecha de venta` ni se degrada en `calidad`", function () {
      const sulfuras = new Item(Products.Sulfuras, 1, 80)
      const store = new GildedRose([sulfuras])

      store.updateQuality()
      
      expect(store.items[0].quality).toBe(80)
      expect(store.items[0].sellIn).toBe(1)
    })
  })

  describe("Una Entrada al Backstage, como el queso brie, incrementa su `calidad` a medida que la `fecha de venta`", () => {
    it("Con más de 10 días se conporta como el queso brie", function () {
      const Backstage_pass = new Item(Products.Backstage_pass, 12, 20 )
      const store = new GildedRose([Backstage_pass])
  
      store.updateQuality()
      
      expect(store.items[0].quality).toBe(21)
    })
    it("Si faltan 10 días o menos para el concierto, la `calidad` se incrementa en `2` unidades", function () {
      const Backstage_pass = new Item(Products.Backstage_pass, 10, 10 )
      const store = new GildedRose([Backstage_pass])
  
      store.updateQuality()
      
      expect(store.items[0].quality).toBe(12)
    })

    it("Si faltan 5 días o menos, la `calidad` se incrementa en `3` unidades", function () {
      const Backstage_pass = new Item(Products.Backstage_pass, 5, 10 )
      const store = new GildedRose([Backstage_pass])
  
      store.updateQuality()
      
      expect(store.items[0].quality).toBe(13)
    })
    it("Luego de la `fecha de venta` la `calidad` cae a `0`", function () {
      const Backstage_pass = new Item(Products.Backstage_pass, 0, 10 )
      const store = new GildedRose([Backstage_pass])
  
      store.updateQuality()
      
      expect(store.items[0].quality).toBe(0)
    })
  })
  describe("Conjured", () => {
    it(" Los artículos `conjurados` degradan su `calidad` al doble de velocidad que los normales", function () {
      const conjured = new Item(Products.Conjured, 1, 10)
      const store = new GildedRose([conjured])

      store.updateQuality()
      
      expect(store.items[0].quality).toBe(8)

      store.updateQuality()
      
      expect(store.items[0].quality).toBe(4)
    })

  })
})


describe("Gilded rose", () => {
  it("Cada dia decrementa los valores del artículo", function () {
    const item = new Item("foo", 5, 10 )
    const store = new GildedRose([item])

    store.updateQuality()

    expect(store.items[0].quality).toBe(9)
    expect(store.items[0].sellIn).toBe(4)
  })
  it("Una vez que ha pasado la fecha recomendada de venta, la `calidad` se degrada al doble de velocidad", function () {
    const item = new Item("foo", 0, 10 )
    const store = new GildedRose([item])

    store.updateQuality()

    expect(store.items[0].quality).toBe(8)
    expect(store.items[0].sellIn).toBe(-1)
  })
  it("La `calidad` de un artículo nunca es negativa", function () {
    const item = new Item("foo", 0, 0 )
    const store = new GildedRose([item])

    store.updateQuality()
    
    expect(store.items[0].quality).toBe(0)
    expect(store.items[0].sellIn).toBe(-1)
  })
  
  it("La tienda funciona con varios productos", function () {
    const items = [
      new Item("Aged Brie", 2, 0), 
      new Item("Elixir of the Mongoose", 5, 7), 
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
    ];
  
    const itemsExpected = [
      new Item("Aged Brie", 1, 1), 
      new Item("Elixir of the Mongoose", 4, 6), 
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
    ]
  
    const store = new GildedRose(items);

    store.updateQuality()
    items.forEach((_, index) => {
      expect(store.items[index].quality).toBe(itemsExpected[index].quality)
      expect(store.items[index].sellIn).toBe(itemsExpected[index].sellIn)
    })
  })


})
