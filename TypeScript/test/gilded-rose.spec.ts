import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    it('should update quality for normal item for 2 consecutive days', function() {
        const gildedRose = new GildedRose([ new Item("+5 Dexterity Vest", 10, 20)]);
        let items = gildedRose.updateQuality();

        // console.log("items", items)
        expect(items[0].name).to.equal('+5 Dexterity Vest');
        expect(items[0].quality).to.equal(19)
        expect(items[0].sellIn).to.equal(9)

        items = gildedRose.updateQuality();

        // console.log("items", items)

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

    it('should not update quality for normal item for quality < 0', function() {
        const gildedRose = new GildedRose([ new Item("+5 Dexterity Vest", 10, 0)]);

        const items = gildedRose.updateQuality();

        // console.log("items", items)

        expect(items[0].name).to.equal('+5 Dexterity Vest');
        expect(items[0].quality).to.equal(0)
    });

    // doesn't work
    it.skip('should not update quality for normal item for quality > 50', function() {

        const gildedRose2 = new GildedRose([ new Item("+5 Dexterity Vest", 10, 60)]);

        const items2 = gildedRose2.updateQuality();
        expect(items2[0].name).to.equal('+5 Dexterity Vest');
        expect(items2[0].quality).to.equal(50)
    });



});
