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

  updateAgedBrie(item: Item, qualityMultipler = 1) {
    item.quality += 1 * qualityMultipler;
    if (item.sellIn < 0) {
      item.quality += 1 * qualityMultipler;
    }
  }

  updateBackstagePass(item: Item, qualityMultipler = 1) {
    if (item.sellIn < 0) {
      item.quality = 0;
      return;
    }

    if (item.sellIn <= 5) {
      item.quality += 3 * qualityMultipler;
      return;
    }
    
    if (item.sellIn <= 10) {
      item.quality += 2 * qualityMultipler;
      return;
    }

    item.quality += 1 * qualityMultipler;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      const isAgedBrie = item.name.includes('Aged Brie');
      const isBackstagePass = item.name.includes('Backstage passes');
      const isSulfuras = item.name.includes('Sulfuras');
      const isConjured = item.name.includes('Conjured');

      if (isSulfuras) continue;

      let qualityMultipler = 1;

      if (isConjured) {
        qualityMultipler = 2;
      }

      // Decrease sellIn by 1
      item.sellIn -= 1;

      if (isAgedBrie) {
        this.updateAgedBrie(item, qualityMultipler);
      }

      if (isBackstagePass) {
        this.updateBackstagePass(item, qualityMultipler);
      }

      if (!isAgedBrie && !isBackstagePass) {
        item.quality -= 1 * qualityMultipler;
        if (item.sellIn < 0) {
          item.quality -= 1 * qualityMultipler;
        }
      }

      // Caps item quality at 0-50
      item.quality = Math.max(0, Math.min(50, item.quality));
    }

    return this.items;
  }
}
