use std::fmt::{self, Display};
pub struct Item {
    pub name: String,
    pub sell_in: i32,
    pub quality: i32,
}

impl Item {
    pub fn new(name: impl Into<String>, sell_in: i32, quality: i32) -> Item {
        Item {
            name: name.into(),
            sell_in,
            quality,
        }
    }
}

impl Display for Item {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}, {}, {}", self.name, self.sell_in, self.quality)
    }
}

pub struct GildedRose {
    pub items: Vec<Item>,
}

impl GildedRose {
    pub fn new(items: Vec<Item>) -> GildedRose {
        GildedRose { items }
    }

    pub fn update_quality(&mut self) {
        for item in &mut self.items {

            if item.name.contains("Sulfuras"){
                item.quality = 80;
            } else if item.name.contains("Aged Brie") || item.name.contains("Backstage passes")  {
                item.quality += 1;
                if item.name.contains("Backstage passes") {
                    if item.sell_in < 11 && item.sell_in > 6 {
                        item.quality += 1
                    } else if item.sell_in < 6 && item.sell_in >= 0 {
                        item.quality += 2
                    } else if item.sell_in < 0 {
                        item.quality = 0
                    }
                }

                if item.quality > 50 {
                    item.quality = 50
                }
                item.sell_in -= 1;
            } else {
                if item.quality > 0 && item.quality <= 50 {
                    if item.sell_in < 0 || item.name.contains("Conjured") {
                        item.quality = item.quality - item.quality
                    } else {
                        item.quality -= 1
                    }
                } else if item.quality < 0 {
                    item.quality = 0
                } else if item.quality > 50{
                    item.quality = 50
                }
                item.sell_in -= 1
            }
            
        }
    }
}


// TESTS

#[cfg(test)]
mod tests {
    use super::{GildedRose, Item};

    #[test]
    pub fn update_quality_for_normal_item_for_2_consecutive_days() {
        let items = vec![Item::new("+5 Dexterity Vest", 10, 20)];
        let mut rose = GildedRose::new(items);
        rose.update_quality();

        assert_eq!("+5 Dexterity Vest", rose.items[0].name);
        assert_eq!(9, rose.items[0].sell_in);
        assert_eq!(19, rose.items[0].quality);

        rose.update_quality();

        assert_eq!("+5 Dexterity Vest", rose.items[0].name);
        assert_eq!(8, rose.items[0].sell_in);
        assert_eq!(18, rose.items[0].quality);
    }

    #[test]
    pub fn update_quality_for_brie_for_2_consecutive_days() {
        let items = vec![Item::new("Aged Brie", 2, 0)];
        let mut rose = GildedRose::new(items);
        rose.update_quality();

        assert_eq!("Aged Brie", rose.items[0].name);
        assert_eq!(1, rose.items[0].sell_in);
        assert_eq!(1, rose.items[0].quality);

        rose.update_quality();

        assert_eq!("Aged Brie", rose.items[0].name);
        assert_eq!(0, rose.items[0].sell_in);
        assert_eq!(2, rose.items[0].quality);
    }

    #[test]
    pub fn update_quality_for_backstage_passes_for_2_consecutive_days_sellin_greater_than_10() {
        let items = vec![Item::new("Backstage passes to a TAFKAL80ETC concert", 15, 20)];
        let mut rose = GildedRose::new(items);
        rose.update_quality();

        assert_eq!("Backstage passes to a TAFKAL80ETC concert", rose.items[0].name);
        assert_eq!(14, rose.items[0].sell_in);
        assert_eq!(21, rose.items[0].quality);

        rose.update_quality();

        assert_eq!("Backstage passes to a TAFKAL80ETC concert", rose.items[0].name);
        assert_eq!(13, rose.items[0].sell_in);
        assert_eq!(22, rose.items[0].quality);
    }

    #[test]
    pub fn update_quality_for_backstage_passes_for_2_consecutive_days_sellin_equal_to_10() {
        let items = vec![Item::new("Backstage passes to a TAFKAL80ETC concert", 10, 48)];
        let mut rose = GildedRose::new(items);
        rose.update_quality();

        assert_eq!("Backstage passes to a TAFKAL80ETC concert", rose.items[0].name);
        assert_eq!(9, rose.items[0].sell_in);
        assert_eq!(50, rose.items[0].quality);

        rose.update_quality();

        assert_eq!("Backstage passes to a TAFKAL80ETC concert", rose.items[0].name);
        assert_eq!(8, rose.items[0].sell_in);
        assert_eq!(50, rose.items[0].quality);
    }
    
    #[test]
    pub fn update_quality_for_backstage_passes_for_2_consecutive_days_sellin_less_than_5() {
        let items = vec![Item::new("Backstage passes to a TAFKAL80ETC concert", 4, 47)];
        let mut rose = GildedRose::new(items);
        rose.update_quality();

        assert_eq!("Backstage passes to a TAFKAL80ETC concert", rose.items[0].name);
        assert_eq!(3, rose.items[0].sell_in);
        assert_eq!(50, rose.items[0].quality);

        rose.update_quality();

        assert_eq!("Backstage passes to a TAFKAL80ETC concert", rose.items[0].name);
        assert_eq!(2, rose.items[0].sell_in);
        assert_eq!(50, rose.items[0].quality);
    }

    #[test]
    pub fn update_quality_for_sulfuras_passes_for_2_consecutive_days() {
        let items = vec![Item::new("Sulfuras, Hand of Ragnaros", -1, 80)];
        let mut rose = GildedRose::new(items);
        rose.update_quality();

        assert_eq!("Sulfuras, Hand of Ragnaros", rose.items[0].name);
        assert_eq!(-1, rose.items[0].sell_in);
        assert_eq!(80, rose.items[0].quality);

        rose.update_quality();

        assert_eq!("Sulfuras, Hand of Ragnaros", rose.items[0].name);
        assert_eq!(-1, rose.items[0].sell_in);
        assert_eq!(80, rose.items[0].quality);
    }

    // doesnt work
    #[test]
    pub fn not_update_quality_for_normal_item_for_quality_less_than_0() {
        let items = vec![Item::new("+5 Dexterity Vest", 10, -6)];
        let mut rose = GildedRose::new(items);
        rose.update_quality();

        assert_eq!("+5 Dexterity Vest", rose.items[0].name);
        assert_eq!(9, rose.items[0].sell_in);
        assert_eq!(0, rose.items[0].quality);
    }

    
}