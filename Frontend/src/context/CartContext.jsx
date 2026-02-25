import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [basketItems, setBasketItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);

      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
        
      return [...prevItems, { ...product, quantity:1 }];
    });
  };
const increaseQuantity = (id) => {
  setCartItems((prev) =>
    prev.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
};

const decreaseQuantity = (id) => {
  setCartItems((prev) =>
    prev
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};
  const addToBasket = (product) => {
    setBasketItems(prev => {
      const exists = prev.find(item => item._id === product.id);
      if (exists) return prev;
      return [...prev, product];
    });
  };

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        basketItems,
        addToCart,
        addToBasket,
        decreaseQuantity,
        increaseQuantity,
        totalItems,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );

  
}

export const useCart = () => useContext(CartContext);