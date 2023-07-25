import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { id, color, amount, product } = action.payload
      // Find the existing product in the cart
      const existingProduct = state.cart.find(
        (item) => item.id === id && item.color === color
      );
      if (existingProduct) {

        const updatedProducts = state.cart.map((item) => {
          if (item.id === id && item.color === color) {
            let itemAmount = item.amount + amount
            console.log(itemAmount);
            if (itemAmount > item.max) {
              itemAmount = item.max
            }
            return {
              ...item,
              amount: itemAmount,
            };
          }
          return item;
        });

        return {
          ...state,
          cart: updatedProducts,
        };
      } else {
        const newProduct = {
          id,
          color,
          amount,
          image: product.images[0].url,
          name: product.name,
          price: product.price,
          max: product.stock
        };
        return {
          ...state,
          cart: [...state.cart, newProduct],
        }
      }
    case REMOVE_CART_ITEM:
      const { id: itemID, color: itemColor } = action.payload;
      const { cart } = state;
      const cartProducts = cart.filter((item) => item.id !== itemID || item.color !== itemColor);

      return {
        ...state,
        cart: cartProducts
      };
    case CLEAR_CART:
      return {
        ...state,
        cart: []
      }
    case TOGGLE_CART_ITEM_AMOUNT:
      const { id: itemId, color: itemColoR, value } = action.payload
      const tempCart = state.cart.map((item) => {
        if (item.id === itemId && item.color === itemColoR) {
          if (value === 'inc') {
            let newAmount = item.amount + 1
            if (newAmount > item.max) {
              newAmount = item.max
            }
            return {
              ...item,
              amount: newAmount
            }
          }
          if (value === 'dec') {
            let newAmount = item.amount - 1
            if (newAmount < 1) {
              newAmount = 1
            }
            return {
              ...item,
              amount: newAmount
            }
          }
        }
        return item


      });
      return {
        ...state,
        cart: tempCart
      }
    case COUNT_CART_TOTALS:
      const { total_items,
        total_amount } = state.cart.reduce((total, item) => {
          const { amount, price } = item
          total.total_items += amount
          total.total_amount += price * amount
          return total
        }, { total_items: 0, total_amount: 0 });
      return {
        ...state,
        total_items,
        total_amount
      }
    default:
      return state;
  }
}

export default cart_reducer
