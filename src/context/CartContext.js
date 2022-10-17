import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [productsOnCart, setProductsOnCart] = useState([]);    
    const [productCount, setProductCount] = useState(0);   
    return (
        <CartContext.Provider
            value={{
                productsOnCart,
                productCount,
                removeProductFromCart: (index) => {
                    setProductsOnCart(productsOnCart.filter((item, i) => i !== index));
                    setProductCount(productCount - 1);
                },
                emptyCart: () => {
                    setProductsOnCart([]);
                    setProductCount(0);
                },
                addProductToCart: (product) => {
                    setProductCount(prev=>prev+1);
                    setProductsOnCart(prev => { prev.push(product); return prev })
                },
            }}>
            {children}
        </CartContext.Provider>
    );
};
