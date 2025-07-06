import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-dark-primary text-white transition-colors duration-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">TechStore</span>
            </div>
            <p className="text-gray-400 dark:text-dark-text-muted mb-4">
              Your trusted partner for the latest electronics and technology solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 dark:text-dark-text-muted hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 dark:text-dark-text-muted hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 dark:text-dark-text-muted hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 dark:text-dark-text-muted hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 dark:text-dark-text-muted hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 dark:text-dark-text-muted hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 dark:text-dark-text-muted hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 dark:text-dark-text-muted hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-gray-400 dark:text-dark-text-muted hover:text-white transition-colors">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 dark:text-dark-text-muted hover:text-white transition-colors">
                  Smartphones
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 dark:text-dark-text-muted hover:text-white transition-colors">
                  Laptops
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 dark:text-dark-text-muted hover:text-white transition-colors">
                  Audio
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 dark:text-dark-text-muted hover:text-white transition-colors">
                  Gaming
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 dark:text-dark-text-muted hover:text-white transition-colors">
                  Accessories
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400 dark:text-dark-text-muted text-sm">123 Tech Street, Digital City</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400 dark:text-dark-text-muted text-sm">+254 (700) 123-456</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400 dark:text-dark-text-muted text-sm">info@techstore.co.ke</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-dark-border mt-8 pt-8 text-center">
          <p className="text-gray-400 dark:text-dark-text-muted">
            © 2024 TechStore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;