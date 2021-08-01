# -*- coding: utf-8 -*-
import unittest

from gilded_rose import Item, GildedRose


# CONSECUTIVE TESTS
def test__update_quality_for_normal_item_for_2_consecutive_days():
    items = [Item("+5 Dexterity Vest", 10, 20)]
    gilded_rose = GildedRose(items)

    gilded_rose.update_quality()
    assert items[0].name == "+5 Dexterity Vest"
    assert items[0].sell_in == 9
    assert items[0].quality == 19

    gilded_rose.update_quality()
    assert items[0].name == "+5 Dexterity Vest"
    assert items[0].sell_in == 8
    assert items[0].quality == 18


def test__update_quality_for_Brie_for_2_consecutive_days():
    items = [Item("Aged Brie", 2, 0)]
    gilded_rose = GildedRose(items)

    gilded_rose.update_quality()
    assert items[0].name == "Aged Brie"
    assert items[0].sell_in == 1
    assert items[0].quality == 1

    gilded_rose.update_quality()
    assert items[0].name == "Aged Brie"
    assert items[0].sell_in == 0
    assert items[0].quality == 2


def test__update_quality_for_Backstage_passes_for_2_consecutive_days_sellin_greater_than_10():
    items = [Item("Backstage passes to a TAFKAL80ETC concert", 15, 20)]
    gilded_rose = GildedRose(items)

    gilded_rose.update_quality()
    assert items[0].name == "Backstage passes to a TAFKAL80ETC concert"
    assert items[0].sell_in == 14
    assert items[0].quality == 21

    gilded_rose.update_quality()
    assert items[0].name == "Backstage passes to a TAFKAL80ETC concert"
    assert items[0].sell_in == 13
    assert items[0].quality == 22


def test__update_quality_for_Backstage_passes_for_2_consecutive_days_sellin_equal_to_10():
    items = [Item("Backstage passes to a TAFKAL80ETC concert", 10, 48)]
    gilded_rose = GildedRose(items)

    gilded_rose.update_quality()
    assert items[0].name == "Backstage passes to a TAFKAL80ETC concert"
    assert items[0].sell_in == 9
    assert items[0].quality == 50

    gilded_rose.update_quality()
    assert items[0].name == "Backstage passes to a TAFKAL80ETC concert"
    assert items[0].sell_in == 8
    assert items[0].quality == 50


def test__update_quality_for_Backstage_passes_for_2_consecutive_days_sellin_less_than_5():
    items = [Item("Backstage passes to a TAFKAL80ETC concert", 4, 47)]
    gilded_rose = GildedRose(items)

    gilded_rose.update_quality()
    assert items[0].name == "Backstage passes to a TAFKAL80ETC concert"
    assert items[0].sell_in == 3
    assert items[0].quality == 50

    gilded_rose.update_quality()
    assert items[0].name == "Backstage passes to a TAFKAL80ETC concert"
    assert items[0].sell_in == 2
    assert items[0].quality == 50


def test__update_quality_for_Sulfuras_passes_for_2_consecutive_days():
    items = [Item("Sulfuras, Hand of Ragnaros", -1, 80)]
    gilded_rose = GildedRose(items)

    gilded_rose.update_quality()
    assert items[0].name == "Sulfuras, Hand of Ragnaros"
    assert items[0].sell_in == -1
    assert items[0].quality == 80

    gilded_rose.update_quality()
    assert items[0].name == "Sulfuras, Hand of Ragnaros"
    assert items[0].sell_in == -1
    assert items[0].quality == 80


# SINGLE INVOKE TESTS
def test__not_update_quality_for_normal_item_for_quality_less_than_0():
    items = [Item("+5 Dexterity Vest", 10, -6)]
    gilded_rose = GildedRose(items)
    gilded_rose.update_quality()
    assert items[0].name == "+5 Dexterity Vest"
    assert items[0].sell_in == 9
    assert items[0].quality == 0
