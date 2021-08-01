# -*- coding: utf-8 -*-


class Item:
    def __init__(self, name, sell_in, quality):
        self.name = name
        self.sell_in = sell_in
        self.quality = quality

    def __repr__(self):
        return "%s, %s, %s" % (self.name, self.sell_in, self.quality)


class GildedRose(object):
    def __init__(self, items):
        self.items = items

    def update_quality(self):
        for item in self.items:
            if "Sulfuras" in item.name:
                item.quality = 80
            elif "Brie" in item.name or "Backstage passes" in item.name:
                item.quality += 1
                if "Backstage passes" in item.name:
                    if item.sell_in < 11 and item.sell_in > 6:
                        item.quality += 1
                    elif item.sell_in < 6 and item.sell_in >= 0:
                        item.quality += 2
                    elif item.sell_in < 0:
                        item.quality = 0

                if item.quality > 50:
                    item.quality = 50

                item.sell_in -= 1
            else:
                if item.quality > 0 and item.quality <= 50:
                    if item.sell_in < 0 or "Conjured" in item.name:
                        item.quality = item.quality - item.quality
                    else:
                        item.quality -= 1
                elif item.quality < 0:
                    item.quality = 0
                elif item.quality > 50:
                    item.quality = 50

                item.sell_in -= 1
