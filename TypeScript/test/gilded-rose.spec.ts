import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    it('should update quality for normal item', function() {
        const gildedRose = new GildedRose([ new Item("+5 Dexterity Vest", 10, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('+5 Dexterity Vest');
        expect(items[0].quality).to.equal(19)
        expect(items[0].sellIn).to.equal(9)
    });


});
