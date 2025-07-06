import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import CheckoutModal from '../components/CheckoutModal';

const Cart = () => {
  const { cartItems, updateQuantity, removeItem, clearCart, cartTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const subtotal = cartTotal;
  const shipping = subtotal > 75000 ? 0 : 7500; // Free shipping over KSh 75,000
  const tax = subtotal * 0.16; // 16% VAT
  const total = subtotal + shipping + tax;

  const handleCheckoutComplete = () => {
    clearCart();
    setIsCheckoutModalOpen(false);
  };

  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      alert('Please sign in to proceed with checkout');
      return;
    }
    setIsCheckoutModalOpen(true);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-dark-primary transition-colors duration-200">
        {/* Header */}
        <div className="bg-white dark:bg-dark-secondary shadow-sm transition-colors duration-200">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-4">
              <Link 
                to="/products" 
                className="flex items-center text-blue-600 hover:text-blue-700 transition-colors mr-4"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Continue Shopping
              </Link>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-dark-text-primary mb-2">
              Shopping Cart
            </h1>
            <p className="text-lg text-gray-600 dark:text-dark-text-secondary">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="h-16 w-16 text-gray-400 dark:text-dark-text-muted mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-dark-text-primary mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-600 dark:text-dark-text-secondary mb-8">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link
                to="/products"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-md overflow-hidden transition-colors duration-200">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-dark-text-primary mb-6">
                      Cart Items
                    </h2>
                    <div className="space-y-6">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 pb-6 border-b border-gray-200 dark:border-dark-border last:border-b-0">
                          <Link to={`/product/${item.id}`} className="flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                          </Link>
                          
                          <div className="flex-1 min-w-0">
                            <Link 
                              to={`/product/${item.id}`}
                              className="text-lg font-medium text-gray-800 dark:text-dark-text-primary hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                              {item.name}
                            </Link>
                            <p className="text-sm text-gray-500 dark:text-dark-text-muted">
                              {item.category}
                            </p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-dark-text-primary mt-1">
                              KSh {item.price.toLocaleString()}
                            </p>
                          </div>

                          <div className="flex items-center space-x-3">
                            <div className="flex items-center border border-gray-300 dark:border-dark-border rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-dark-tertiary transition-colors"
                              >
                                <Minus className="h-4 w-4 text-gray-600 dark:text-dark-text-secondary" />
                              </button>
                              <span className="px-4 py-2 min-w-[60px] text-center text-gray-900 dark:text-dark-text-primary">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-dark-tertiary transition-colors"
                              >
                                <Plus className="h-4 w-4 text-gray-600 dark:text-dark-text-secondary" />
                              </button>
                            </div>
                            
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-md p-6 sticky top-4 transition-colors duration-200">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-dark-text-primary mb-6">
                    Order Summary
                  </h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-dark-text-secondary">Subtotal</span>
                      <span className="text-gray-900 dark:text-dark-text-primary font-medium">
                        KSh {subtotal.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-dark-text-secondary">Shipping</span>
                      <span className="text-gray-900 dark:text-dark-text-primary font-medium">
                        {shipping === 0 ? 'Free' : `KSh ${shipping.toLocaleString()}`}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-dark-text-secondary">VAT (16%)</span>
                      <span className="text-gray-900 dark:text-dark-text-primary font-medium">
                        KSh {tax.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="border-t border-gray-200 dark:border-dark-border pt-4">
                      <div className="flex justify-between">
                        <span className="text-lg font-semibold text-gray-800 dark:text-dark-text-primary">Total</span>
                        <span className="text-lg font-bold text-gray-900 dark:text-dark-text-primary">
                          KSh {total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {shipping > 0 && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        Add KSh {(75000 - subtotal).toLocaleString()} more for free shipping!
                      </p>
                    </div>
                  )}

                  <button 
                    onClick={handleProceedToCheckout}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors mb-4"
                  >
                    Proceed to Checkout
                  </button>
                  
                  <Link
                    to="/products"
                    className="block w-full text-center border border-gray-300 dark:border-dark-border text-gray-700 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-dark-tertiary py-3 px-6 rounded-lg font-medium transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        cartItems={cartItems}
        total={total}
        onCheckoutComplete={handleCheckoutComplete}
      />
    </>
  );
};

export default Cart;