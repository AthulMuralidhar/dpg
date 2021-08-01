use src::gildedrose::{GildedRose, Item};

#[cfg(test)]
mod tests {
    // use gildedrose::{GildedRose, Item};

    #[test]
    pub fn foo() {
        let items = vec![Item::new("foo", 0, 0)];
        let mut rose = GildedRose::new(items);
        rose.update_quality();

        assert_eq!("foo", rose.items[0].name);
    }
}
