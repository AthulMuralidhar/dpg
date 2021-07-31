import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    // CONSECUTIVE DAYS TEST
    it('should update quality for normal item for 2 consecutive days', function() {
        const gildedRose = new GildedRose([ new Item("+5 Dexterity Vest", 10, 20)]);
        let items = gildedRose.updateQuality();

        expect(items[0].name).to.equal('+5 Dexterity Vest');
        expect(items[0].quality).to.equal(19)
        expect(items[0].sellIn).to.equal(9)

        items = gildedRose.updateQuality();

        expect(items[0].name).to.equal('+5 Dexterity Vest');
        expect(items[0].quality).to.equal(18)
        expect(items[0].sellIn).to.equal(8)
    });
    it('should update quality for Brie for 2 consecutive days', function() {
        const gildedRose = new GildedRose( [new Item("Aged Brie", 2, 0)]);

        let items = gildedRose.updateQuality();

        expect(items[0].name).to.equal('Aged Brie');
        expect(items[0].quality).to.equal(1)
        expect(items[0].sellIn).to.equal(1)


        items = gildedRose.updateQuality();

        expect(items[0].name).to.equal('Aged Brie');
        expect(items[0].quality).to.equal(2)
        expect(items[0].sellIn).to.equal(0)

    });
    it('should update quality for "Backstage passes  for 2 consecutive days - sellin > 10', function() {
        const gildedRose = new GildedRose( [new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20)]);

        let items = gildedRose.updateQuality();

        expect(items[0].name).to.equal('Backstage passes to a TAFKAL80ETC concert');
        expect(items[0].quality).to.equal(21)
        expect(items[0].sellIn).to.equal(14)


        items = gildedRose.updateQuality();

        expect(items[0].name).to.equal('Backstage passes to a TAFKAL80ETC concert');
        expect(items[0].quality).to.equal(22)
        expect(items[0].sellIn).to.equal(13)

    });
    it('should update quality for "Backstage passes  for 2 consecutive days - sellin = 10', function() {
        const gildedRose = new GildedRose( [ new Item("Backstage passes to a TAFKAL80ETC concert", 10, 48)]);
        let items = gildedRose.updateQuality();

        expect(items[0].name).to.equal('Backstage passes to a TAFKAL80ETC concert');
        expect(items[0].quality).to.equal(50)
        expect(items[0].sellIn).to.equal(9)


        items = gildedRose.updateQuality();

        expect(items[0].name).to.equal('Backstage passes to a TAFKAL80ETC concert');
        expect(items[0].quality).to.equal(50)
        expect(items[0].sellIn).to.equal(8)
    });
    it('should update quality for "Backstage passes  for 2 consecutive days - sellin < 5', function() {
        const gildedRose = new GildedRose( [ new Item("Backstage passes to a TAFKAL80ETC concert", 4, 47)]);
        let items = gildedRose.updateQuality();

        expect(items[0].name).to.equal('Backstage passes to a TAFKAL80ETC concert');
        expect(items[0].quality).to.equal(50)
        expect(items[0].sellIn).to.equal(3)


        items = gildedRose.updateQuality();

        expect(items[0].name).to.equal('Backstage passes to a TAFKAL80ETC concert');
        expect(items[0].quality).to.equal(50)
        expect(items[0].sellIn).to.equal(2)
    });
    it('should update quality for "Sulfuras passes  for 2 consecutive days', function() {
        const gildedRose = new GildedRose( [new Item("Sulfuras, Hand of Ragnaros", -1, 80)]);
        let items = gildedRose.updateQuality();

        expect(items[0].name).to.equal('Sulfuras, Hand of Ragnaros');
        expect(items[0].quality).to.equal(80)
        expect(items[0].sellIn).to.equal(-1)


        items = gildedRose.updateQuality();

        expect(items[0].name).to.equal('Sulfuras, Hand of Ragnaros');
        expect(items[0].quality).to.equal(80)
        expect(items[0].sellIn).to.equal(-1)
    });

    // SINGLE INVOKE TESTS
    it('should not update quality for normal item for quality < 0', function() {
        const gildedRose = new GildedRose([ new Item("+5 Dexterity Vest", 10, 0)]);
        const items = gildedRose.updateQuality();
        
        expect(items[0].name).to.equal('+5 Dexterity Vest');
        expect(items[0].quality).to.equal(0)
        expect(items[0].sellIn).to.equal(9)
    });
    it('should not update quality for normal item for quality > 50', function() {
        const gildedRose = new GildedRose([ new Item("+5 Dexterity Vest", 10, 60)]);
        const item = gildedRose.updateQuality();
        expect(item[0].name).to.equal('+5 Dexterity Vest');
        expect(item[0].quality).to.equal(50)
        expect(item[0].sellIn).to.equal(9)
    });
    it('should not update quality for backstage tickets item for quality > 50', function() {
        const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 50)]);
        const item = gildedRose.updateQuality();
        expect(item[0].name).to.equal('Backstage passes to a TAFKAL80ETC concert');
        expect(item[0].quality).to.equal(50)
        expect(item[0].sellIn).to.equal(9)
    });
    it('should update quality for normal item for sell in < 0', function() {
        const gildedRose = new GildedRose([ new Item("+5 Dexterity Vest", -1, 50)]);
        const item = gildedRose.updateQuality();
        expect(item[0].name).to.equal('+5 Dexterity Vest');
        expect(item[0].quality).to.equal(0)
        expect(item[0].sellIn).to.equal(-2)
    });
    it('should update quality for Conjured item', function() {
        const gildedRose = new GildedRose([ new Item("Conjured Mana Cake", 13, 50)]);
        const item = gildedRose.updateQuality();
        expect(item[0].name).to.equal('Conjured Mana Cake');
        expect(item[0].quality).to.equal(0)
        expect(item[0].sellIn).to.equal(12)
    });
    it('should not update quality for backstage tickets item for sellin < 0', function() {
        const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", -1, 50)]);
        const item = gildedRose.updateQuality();
        expect(item[0].name).to.equal('Backstage passes to a TAFKAL80ETC concert');
        expect(item[0].quality).to.equal(0)
        expect(item[0].sellIn).to.equal(-2)
    });
    it('should set negative quality for Brie to 0', function() {
        const gildedRose = new GildedRose([new Item("Aged Brie", 2, -1)]);

        let items = gildedRose.updateQuality();

        expect(items[0].name).to.equal('Aged Brie');
        expect(items[0].quality).to.equal(0)
        expect(items[0].sellIn).to.equal(1)
    })
// make tests for:
    // - quality negative for backstage pass


});
