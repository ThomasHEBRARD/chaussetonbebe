import React from 'react';
import { CartItemContainer, ImageContainer, ItemDetailsContainer } from './cart-item.styles';
interface ICartItemProps {
  item: {
    imageUrl: string,
    price: number,
    name: string,
    stock: number
  }
}

const CartItem: React.FC<ICartItemProps> = ({ item: { imageUrl, price, name, stock } }) => (
  <CartItemContainer>
    <ImageContainer src={imageUrl} alt='item' />
    <ItemDetailsContainer>
      <span className='name'>{name}</span>
      <span className='price'>
        {stock} x ${price}
      </span>
    </ItemDetailsContainer>
  </CartItemContainer>
);

export default CartItem;