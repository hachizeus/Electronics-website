import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import { Truck, Shield, Headphones, Award, ArrowRight } from 'lucide-react';

const Home = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      price: 179900,
      originalPrice: 194900,
      image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      reviews: 234,
      category: "Smartphones",
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
      category: "Laptops",
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
      category: "Audio",
      isSale: true
    },
    {
      id: 4,
      name: "Smart Watch Series 9",
      price: 59900,
      image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.5,
      reviews: 312,
      category: "Wearables"
    }
  ];

  const features = [
    {
      icon: <Truck className="h-8 w-8 text-blue-600" />,
      title: "Free Shipping",
      description: "Free delivery on orders over KSh 7,500"
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Secure Payment",
      description: "100% secure payment processing"
    },
    {
      icon: <Headphones className="h-8 w-8 text-blue-600" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support"
    },
    {
      icon: <Award className="h-8 w-8 text-blue-600" />,
      title: "Quality Guarantee",
      description: "30-day money-back guarantee"
    }
  ];

  return (
    <div className="bg-gray-50 dark:bg-dark-primary transition-colors duration-200">
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-dark-secondary transition-colors duration-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-dark-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-dark-text-secondary">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50 dark:bg-dark-primary transition-colors duration-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-dark-text-primary mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 dark:text-dark-text-secondary max-w-2xl mx-auto">
              Discover our handpicked selection of the latest and most popular electronics
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/products"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white dark:bg-dark-secondary transition-colors duration-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-dark-text-primary mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600 dark:text-dark-text-secondary">
              Find exactly what you're looking for
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Smartphones",
                image: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=400",
                count: "250+ Products"
              },
              {
                name: "Laptops & Computers",
                image: "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400",
                count: "180+ Products"
              },
              {
                name: "Audio & Headphones",
                image: "https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=400",
                count: "120+ Products"
              }
            ].map((category, index) => (
              <Link
                key={index}
                to="/products"
                className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">{category.name}</h3>
                    <p className="text-base sm:text-lg">{category.count}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;