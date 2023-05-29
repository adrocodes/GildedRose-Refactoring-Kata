import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  test("Glided Rose constructor", () => {
    const gildedRose = new GildedRose();
    expect(gildedRose.items.length).toBe(0);
  })

  it('degrades the quality and sellIn values of a normal item by 1', () => {
    const gildedRose = new GildedRose([new Item('normal', 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(9);
  })

  it('degrades the quality of a normal item twice as fast after sellIn date', () => {
    const gildedRose = new GildedRose([new Item('normal', 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(8);
  })

  it('never degrades the quality of a normal item below 0', () => {
    const gildedRose = new GildedRose([new Item('normal', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(0);
  })

  test('Aged Brie increases in quality the older it gets', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(11);
  })

  test('Aged Brie increases in quality twice as fast after sellIn date', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(12);
  })

  test('The quality of a item is never more than 50', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 10, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(50);
  })

  test('Sulfuras never has to be sold or decreases in quality', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 10, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(10);
    expect(items[0].quality).toBe(80);
  })

  test('Backstage passes increases in quality the older it gets', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 20, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(19);
    expect(items[0].quality).toBe(11);
  })

  test("Backstage passes increases in quality by 2 when there are 10 days or less", () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(12);
  })

  test("Backstage passes increases in quality by 3 when there are 5 days or less", () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(13);
  })

  test("Backstage passes quality drops to 0 after the concert", () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(0);
  })

  test("Backstage quality never goes above 50", () => {
    let gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49)]);
    let items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(50);

    gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49)]);
    items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(50);
  })

  test("Degrading a non-special item below 0", () => {
    const gildedRose = new GildedRose([new Item('normal', 0, 2)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(0);
  })

  test("Conjured items degrade in quality twice as fast as normal items", () => {
    const gildedRose = new GildedRose([new Item('Conjured', 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(8);
  })

  test("Conjured Backstage passes", () => {
    const gildedRose = new GildedRose([new Item('Conjured Backstage passes to a TAFKAL80ETC concert', 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(14);
  })
});
