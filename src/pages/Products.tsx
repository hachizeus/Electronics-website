import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Filter, Search, Grid, List } from 'lucide-react';

const Products = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 750000]);
  const [sortBy, setSortBy] = useState('featured');

  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      price: 179900,
      originalPrice: 194900,
      image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      reviews: 234,
      category: "smartphones",
      isNew: true,
      isSale: true
    },
    {
      id: 2,
      name: "Gaming Laptop RTX 4080",
      price: 374900,
      image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.7,
      reviews: 156,
      category: "laptops",
      isNew: true
    },
    {
      id: 3,
      name: "Wireless Headphones Pro",
      price: 44900,
      originalPrice: 59900,
      image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.6,
      reviews: 89,
      category: "audio",
      isSale: true
    },
    {
      id: 4,
      name: "Smart Watch Series 9",
      price: 59900,
      image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.5,
      reviews: 312,
      category: "wearables"
    },
    {
      id: 5,
      name: "MacBook Pro 16-inch",
      price: 359900,
      image: "https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      reviews: 445,
      category: "laptops",
      isNew: true
    },
    {
      id: 6,
      name: "Samsung Galaxy S24 Ultra",
      price: 194900,
      image: "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.7,
      reviews: 198,
      category: "smartphones"
    },
    {
      id: 7,
      name: "iPad Pro 12.9-inch",
      price: 164900,
      originalPrice: 179900,
      image: "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      reviews: 267,
      category: "tablets",
      isSale: true
    },
    {
      id: 8,
      name: "Gaming Mechanical Keyboard",
      price: 23900,
      image: "https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.4,
      reviews: 156,
      category: "accessories"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', count: products.length },
    { id: 'smartphones', name: 'Smartphones', count: products.filter(p => p.category === 'smartphones').length },
    { id: 'laptops', name: 'Laptops', count: products.filter(p => p.category === 'laptops').length },
    { id: 'audio', name: 'Audio', count: products.filter(p => p.category === 'audio').length },
    { id: 'wearables', name: 'Wearables', count: products.filter(p => p.category === 'wearables').length },
    { id: 'tablets', name: 'Tablets', count: products.filter(p => p.category === 'tablets').length },
    { id: 'accessories', name: 'Accessories', count: products.filter(p => p.category === 'accessories').length }
  ];

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    return categoryMatch && priceMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-primary transition-colors duration-200">
      {/* Header */}
      <div className="bg-white dark:bg-dark-secondary shadow-sm transition-colors duration-200">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-dark-text-primary mb-4">
            Products
          </h1>
          <p className="text-lg text-gray-600 dark:text-dark-text-secondary">
            Discover our complete collection of electronics
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-md p-6 sticky top-4 transition-colors duration-200">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text-primary mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                  Search Products
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-dark-tertiary text-gray-900 dark:text-dark-text-primary placeholder-gray-500 dark:placeholder-dark-text-muted"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 dark:text-dark-text-muted" />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                  Categories
                </label>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category.id} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={selectedCategory === category.id}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mr-2 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-dark-text-secondary flex-1">
                        {category.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-dark-text-muted">
                        ({category.count})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                  Price Range (KSh)
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                    className="w-20 px-2 py-1 border border-gray-300 dark:border-dark-border rounded text-sm bg-white dark:bg-dark-tertiary text-gray-900 dark:text-dark-text-primary"
                  />
                  <span className="text-gray-500 dark:text-dark-text-muted">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 750000])}
                    className="w-20 px-2 py-1 border border-gray-300 dark:border-dark-border rounded text-sm bg-white dark:bg-dark-tertiary text-gray-900 dark:text-dark-text-primary"
                  />
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setPriceRange([0, 750000]);
                }}
                className="w-full bg-gray-200 dark:bg-dark-border hover:bg-gray-300 dark:hover:bg-dark-tertiary text-gray-800 dark:text-dark-text-primary py-2 px-4 rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Top Bar */}
            <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-sm p-4 mb-6 transition-colors duration-200">
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                  <span className="text-sm text-gray-600 dark:text-dark-text-muted">
                    {filteredProducts.length} products found
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-dark-text-muted'}`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-dark-text-muted'}`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-dark-text-muted">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 dark:border-dark-border rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-dark-tertiary text-gray-900 dark:text-dark-text-primary"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button className="px-3 py-2 text-sm font-medium text-gray-500 dark:text-dark-text-muted bg-white dark:bg-dark-secondary border border-gray-300 dark:border-dark-border rounded-md hover:bg-gray-50 dark:hover:bg-dark-tertiary transition-colors">
                  Previous
                </button>
                {[1, 2, 3, 4, 5].map(page => (
                  <button
                    key={page}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      page === 1
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 dark:text-dark-text-secondary bg-white dark:bg-dark-secondary border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-tertiary'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="px-3 py-2 text-sm font-medium text-gray-500 dark:text-dark-text-muted bg-white dark:bg-dark-secondary border border-gray-300 dark:border-dark-border rounded-md hover:bg-gray-50 dark:hover:bg-dark-tertiary transition-colors">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;