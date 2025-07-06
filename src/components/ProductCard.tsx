import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = useCart();

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      addToCart(product);
      setIsLoading(false);
      
      // Show success message (you can implement a toast notification here)
      console.log(`Added ${product.name} to cart`);
    }, 500);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsFavorite(!isFavorite);
    console.log(`${isFavorite ? 'Removed from' : 'Added to'} favorites: ${product.name}`);
  };

  return (
    <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                NEW
              </span>
            )}
            {product.isSale && (
              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                -{discount}%
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={handleToggleFavorite}
              className={`p-2 rounded-full shadow-md transition-all duration-200 ${
                isFavorite 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white dark:bg-dark-tertiary hover:bg-gray-100 dark:hover:bg-dark-border'
              }`}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : 'text-gray-600 dark:text-dark-text-secondary'}`} />
            </button>
            <button 
              onClick={handleAddToCart}
              disabled={isLoading}
              className="bg-blue-600 p-2 rounded-full shadow-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <ShoppingCart className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      </Link>

      <div className="p-4">
        <div className="text-xs text-gray-500 dark:text-dark-text-muted uppercase tracking-wide mb-1">
          {product.category}
        </div>
        
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text-primary mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300 dark:text-dark-border'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-dark-text-muted ml-2">
            ({product.reviews} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900 dark:text-dark-text-primary">
              KSh {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 dark:text-dark-text-muted line-through">
                KSh {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <button 
            onClick={handleAddToCart}
            disabled={isLoading}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50`}
          >
            {isLoading ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;