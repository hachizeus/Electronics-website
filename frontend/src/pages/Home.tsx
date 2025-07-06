import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Truck, Shield, Headphones, Award, ArrowRight, Zap } from 'lucide-react';

const Home = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
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

  if (!featuredProducts.length) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Why Choose Us</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Experience the best in electronics shopping with our premium services</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group bg-white dark:bg-gray-800 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up border border-gray-100 dark:border-gray-700"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="bg-blue-100 dark:bg-blue-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-500 transition-all duration-300">
                  <div className="text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Sales */}
      <section className="py-8 bg-blue-600 dark:bg-blue-700 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              ⚡ Flash Sales
            </h2>
            <div className="text-white text-sm font-mono">
              Time Left: {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {featuredProducts.slice(0, 6).map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="bg-white dark:bg-dark-secondary rounded-lg p-3 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <img src={product.image} alt={product.name} className="w-full h-24 object-cover rounded mb-2" />
                <h3 className="text-xs font-medium text-gray-800 dark:text-dark-text-primary mb-1 truncate">{product.name}</h3>
                <p className="text-sm font-bold text-blue-600 dark:text-blue-400">KSh {product.price.toLocaleString()}</p>
                <div className="text-xs text-red-500">-25%</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover our handpicked selection of the latest and most popular electronics, carefully curated for tech enthusiasts
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 200}ms`, animationFillMode: 'forwards' }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/products"
              className="group inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              View All Products
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
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