import React, { createContext, useContext, useReducer, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

const initialState = {
  items: JSON.parse(localStorage.getItem('cartItems')) || [],
  total: 0,
  itemCount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => 
        (item.product?._id || item._id) === (action.payload.product?._id || action.payload._id)
      );
      
      if (existingItem) {
        const updatedItems = state.items.map(item => {
          const itemId = item.product?._id || item._id;
          const payloadId = action.payload.product?._id || action.payload._id;
          return itemId === payloadId
            ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
            : item;
        });
        return {
          ...state,
          items: updatedItems,
        };
      } else {
        // Handle both old format (with product wrapper) and new format (direct product)
        const newItem = action.payload.product 
          ? action.payload 
          : { product: action.payload, quantity: action.payload.quantity || 1 };
        
        return {
          ...state,
          items: [...state.items, newItem],
        };
      }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => 
          (item.product?._id || item._id) !== action.payload
        ),
      };

    case 'UPDATE_QUANTITY':
      const updatedItems = state.items.map(item => {
        const itemId = item.product?._id || item._id;
        return itemId === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item;
      });
      return {
        ...state,
        items: updatedItems,
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };

    case 'CALCULATE_TOTALS':
      const itemCount = state.items.reduce((total, item) => total + (item.quantity || 0), 0);
      const total = state.items.reduce((total, item) => {
        const price = item.product?.price || item.price || 0;
        const quantity = item.quantity || 0;
        return total + (price * quantity);
      }, 0);
      
      return {
        ...state,
        itemCount,
        total,
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    // Handle both old format (with product wrapper) and new format (direct product)
    const payload = product.product 
      ? { product, quantity }
      : { product, quantity };
    
    dispatch({
      type: 'ADD_TO_CART',
      payload: payload,
    });
    
    const productName = product.product?.name || product.name || 'Item';
    toast.success(`${productName} added to cart!`);
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: productId,
    });
    toast.success('Item removed from cart');
  };

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { productId, quantity },
    });
  };

  // Clear cart
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast.success('Cart cleared');
  };

  // Get item quantity
  const getItemQuantity = (productId) => {
    const item = state.items.find(item => 
      (item.product?._id || item._id) === productId
    );
    return item ? item.quantity : 0;
  };

  // Check if item is in cart
  const isInCart = (productId) => {
    return state.items.some(item => 
      (item.product?._id || item._id) === productId
    );
  };

  // Calculate totals when items change
  useEffect(() => {
    dispatch({ type: 'CALCULATE_TOTALS' });
  }, [state.items]);

  // Save to localStorage when cart changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(state.items));
  }, [state.items]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemQuantity,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};