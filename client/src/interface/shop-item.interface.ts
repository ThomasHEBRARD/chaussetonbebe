interface ShopItem {
  _id: number,
  name: string,
  imageUrl: string,
  price: number,
  stock?: number
}

export default ShopItem;