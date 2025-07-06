import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, Minus, Plus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart } = useCart();

  // Mock product data - in real app, this would come from an API
  const product = {
    id: parseInt(id || '1'),
    name: "iPhone 15 Pro Max",
    price: 179900,
    originalPrice: 194900,
    images: [
      "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    rating: 4.8,
    reviews: 234,
    category: "Smartphones",
    brand: "Apple",
    description: "The iPhone 15 Pro Max is the ultimate iPhone experience with the most advanced technology. Featuring a stunning 6.7-inch Super Retina XDR display, the powerful A17 Pro chip, and an incredible camera system that captures life in vivid detail.",
    features: [
      "6.7-inch Super Retina XDR display",
      "A17 Pro chip with 6-core GPU",
      "Pro camera system with 48MP Main",
      "Up to 29 hours video playback",
      "Titanium design with Ceramic Shield front",
      "5G connectivity",
      "iOS 17 with new features"
    ],
    specifications: {
      "Display": "6.7-inch Super Retina XDR",
      "Processor": "A17 Pro chip",
      "Storage": "256GB",
      "Camera": "48MP Main + 12MP Ultra Wide + 12MP Telephoto",
      "Battery": "Up to 29 hours video playback",
      "Operating System": "iOS 17",
      "Weight": "221 grams"
    },
    inStock: true,
    stockCount: 15
  };

  const relatedProducts = [
    {
      id: 2,
      name: "iPad Pro 12.9-inch",
      price: 164900,
      image: "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8
    },
    {
      id: 3,
      name: "AirPods Pro",
      price: 44900,
      image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.6
    },
    {
      id: 4,
      name: "Apple Watch Series 9",
      price: 59900,
      image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.5
    }
  ];

  const updateQuantity = (delta: number) => {
    setQuantity(prev => Math.max(1, Math.min(prev + delta, product.stockCount)));
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    
    // Simulate API call
    setTimeout(() => {
      addToCart(product, quantity);
      setIsAddingToCart(false);
      console.log(`Added ${quantity} x ${product.name} to cart`);
    }, 1000);
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    console.log(`${isFavorite ? 'Removed from' : 'Added to'} favorites: ${product.name}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-primary transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 dark:text-dark-text-muted mb-6">
          <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-blue-600 dark:hover:text-blue-400">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-dark-text-primary">{product.name}</span>
        </nav>

        <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-lg p-4 sm:p-6 mb-8 transition-colors duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div>
              <div className="mb-4">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-64 sm:h-96 object-cover rounded-lg"
                />
              </div>
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden ${
                      selectedImage === index ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-dark-text-primary mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
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
                <p className="text-sm text-gray-600 dark:text-dark-text-muted mb-2">
                  Brand: <span className="font-medium">{product.brand}</span>
                </p>
                <p className="text-sm text-gray-600 dark:text-dark-text-muted">
                  Category: <span className="font-medium">{product.category}</span>
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                  <span className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-dark-text-primary">
                    KSh {product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg sm:text-xl text-gray-500 dark:text-dark-text-muted line-through">
                      KSh {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-sm font-medium px-2 py-1 rounded mt-2 sm:mt-0">
                      Save KSh {(product.originalPrice - product.price).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.inStock ? (
                  <div className="flex items-center text-green-600 dark:text-green-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span>In Stock ({product.stockCount} available)</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600 dark:text-red-400">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span>Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Quantity and Add to Cart */}
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="flex items-center border border-gray-300 dark:border-dark-border rounded-lg">
                    <button
                      onClick={() => updateQuantity(-1)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-dark-tertiary transition-colors"
                    >
                      <Minus className="h-4 w-4 text-gray-600 dark:text-dark-text-muted" />
                    </button>
                    <span className="px-4 py-2 min-w-[60px] text-center text-gray-900 dark:text-dark-text-primary">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(1)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-dark-tertiary transition-colors"
                    >
                      <Plus className="h-4 w-4 text-gray-600 dark:text-dark-text-muted" />
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock || isAddingToCart}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center disabled:opacity-50"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                  </button>
                  <button 
                    onClick={handleToggleFavorite}
                    className={`p-3 border border-gray-300 dark:border-dark-border rounded-lg transition-all duration-200 ${
                      isFavorite 
                        ? 'bg-red-500 border-red-500 text-white' 
                        : 'hover:bg-gray-50 dark:hover:bg-dark-tertiary'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : 'text-gray-600 dark:text-dark-text-muted'}`} />
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-dark-text-muted">
                  <div className="flex items-center">
                    <Truck className="h-4 w-4 mr-1" />
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-1" />
                    <span>2 Year Warranty</span>
                  </div>
                  <div className="flex items-center">
                    <RotateCcw className="h-4 w-4 mr-1" />
                    <span>30 Day Returns</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text-primary mb-2">
                  Description
                </h3>
                <p className="text-gray-600 dark:text-dark-text-secondary leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text-primary mb-2">
                  Key Features
                </h3>
                <ul className="space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-gray-600 dark:text-dark-text-secondary">
                      <span className="text-blue-600 mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-lg p-4 sm:p-6 mb-8 transition-colors duration-200">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-dark-text-primary mb-4">
            Specifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-200 dark:border-dark-border">
                <span className="font-medium text-gray-700 dark:text-dark-text-secondary">{key}:</span>
                <span className="text-gray-600 dark:text-dark-text-muted">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-lg p-4 sm:p-6 transition-colors duration-200">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-dark-text-primary mb-6">
            Related Products
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProducts.map(relatedProduct => (
              <Link 
                key={relatedProduct.id} 
                to={`/product/${relatedProduct.id}`}
                className="border border-gray-200 dark:border-dark-border rounded-lg p-4 hover:shadow-md transition-all duration-200 transform hover:-translate-y-1 group"
              >
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  className="w-full h-48 object-cover rounded-lg mb-4 transition-transform duration-300 group-hover:scale-105"
                />
                <h4 className="font-medium text-gray-800 dark:text-dark-text-primary mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {relatedProduct.name}
                </h4>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900 dark:text-dark-text-primary">
                    KSh {relatedProduct.price.toLocaleString()}
                  </span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 dark:text-dark-text-muted ml-1">
                      {relatedProduct.rating}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;