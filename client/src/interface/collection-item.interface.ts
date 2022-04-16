import ShopItem from './shop-item.interface';

interface CollectionItem {
  id: number,
  name: string,
  imageUrl?: string,
  routeName?: string,
  items?: ShopItem[]
}

export default CollectionItem;