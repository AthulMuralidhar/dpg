
/*
notes
- in essence this is basically like a system where an item degrades in quality
 the worst quality is on the last day or the sell in day
- update quality just lowers the quality and sell in date by some ammount
-

conditions:
- if current date > sell in date then the quality lowers by 2* degrading rate
- quality should be always >= 0
- item name: aged brie increases in quality as it sits past the sell in date
- quality should be always <= 50
- function updatequality has no effect  on item.name=== Sulfuras
        - special case "Sulfuras"
            -  Quality is 80 and it never alters.

-  item name = "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
        - special case for back stage passes:
            - Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less
            - but Quality drops to 0 after the concert


 New feature to impliment:
 - new type of items = conjured items
 conditions:
 - "Conjured" items degrade in Quality twice as fast as normal items

*/

export class Item {
    // DO NOT CHANGE
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
        // CHANGE THIS ONE

        for (let item of this.items) {
            if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
                if (item.quality > 0) {
                    if (item.name != 'Sulfuras, Hand of Ragnaros') {
                        item.quality = item.quality - 1
                    }
                }
            } else {
                if (item.quality < 50) {
                    item.quality = item.quality + 1
                    if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
                        if (item.sellIn < 11) {
                            if (item.quality < 50) {
                                item.quality = item.quality + 1
                            }
                        }
                        if (item.sellIn < 6) {
                            if (item.quality < 50) {
                                item.quality = item.quality + 1
                            }
                        }
                    }
                }
            }
            if (item.name != 'Sulfuras, Hand of Ragnaros') {
                item.sellIn = item.sellIn - 1;
            }
            if (item.sellIn < 0) {
                if (item.name != 'Aged Brie') {
                    if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
                        if (item.quality > 0) {
                            if (item.name != 'Sulfuras, Hand of Ragnaros') {
                                item.quality = item.quality - 1
                            }
                        }
                    } else {
                        item.quality = item.quality - item.quality
                    }
                } else {
                    if (item.quality < 50) {
                        item.quality = item.quality + 1
                    }
                }
            }
        }

        return this.items;
    }
}
