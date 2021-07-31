export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        for (let item of this.items) {
            if (item.name.includes('Sulfuras')){
                item.quality = 80
            } else if (item.name.includes('Aged Brie') || item.name.includes('Backstage passes ')) {
                item.quality = item.quality + 1
                if (item.name.includes('Backstage passes')) {
                    if ( item.sellIn < 11 && item.sellIn > 6) {
                        item.quality = item.quality + 1
                    } else if (item.sellIn < 6 && item.sellIn >= 0) {
                        item.quality = item.quality + 2
                    } else if (item.sellIn < 0) {
                        item.quality = 0
                    }
                }
                if (item.quality > 50) {
                    item.quality = 50
                }
                item.sellIn = item.sellIn - 1;
            } else {
                if (item.quality > 0 && item.quality <= 50) {
                    if (item.sellIn < 0 || item.name.includes('Conjured')) {
                        item.quality = item.quality - item.quality
                    } else {
                        item.quality = item.quality - 1
                    }
                } else if (item.quality < 0) {
                    item.quality = 0
                } else if (item.quality > 50){
                    item.quality = 50
                }
                item.sellIn -= 1
            }
        }

        return this.items;
    }
}
