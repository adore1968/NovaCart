import { CartContext } from "./CartContext";
import { useProducts } from "../products/ProductsContext";
import { useState } from "react";
import { toast } from "react-toastify";

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const { products } = useProducts();

  const handleAddCart = (product) => {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.id === product.id);

      if (exists) {
        return prevCart.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      }

      return [
        ...prevCart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: 1,
        },
      ];
    });
    toast.success(`${product.name} added to cart`);
  };

  const removeFromCart = (id) => {
    const product = products.find((product) => product.id === id);
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    toast.success(`${product?.name || "Product"} removed from cart`);
  };

  const clearCart = () => {
    if (window.confirm("Are you sure you want to clear the cart?")) {
      setCart([]);
      toast.success("Your cart has been cleared");
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, handleAddCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
