import React from 'react';
import { Wrench, Headphones, Shield, Truck, Clock, Award } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Wrench className="h-8 w-8 text-blue-600" />,
      title: "Device Repair",
      description: "Professional repair services for smartphones, laptops, and tablets",
      features: ["Screen replacement", "Battery replacement", "Water damage repair", "Hardware diagnostics"],
      price: "Starting at KSh 7,350"
    },
    {
      icon: <Headphones className="h-8 w-8 text-blue-600" />,
      title: "Technical Support",
      description: "24/7 technical support for all your electronic devices",
      features: ["Phone support", "Remote assistance", "Setup and installation", "Troubleshooting"],
      price: "Free with purchase"
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Extended Warranty",
      description: "Comprehensive warranty coverage for peace of mind",
      features: ["Up to 3 years coverage", "Accidental damage protection", "Free repairs", "Replacement guarantee"],
      price: "Starting at KSh 14,850"
    },
    {
      icon: <Truck className="h-8 w-8 text-blue-600" />,
      title: "Installation & Setup",
      description: "Professional installation and setup services",
      features: ["Home installation", "Network setup", "Data transfer", "Device configuration"],
      price: "Starting at KSh 11,250"
    }
  ];

  const benefits = [
    {
      icon: <Clock className="h-6 w-6 text-blue-600" />,
      title: "24/7 Support",
      description: "Round-the-clock customer service"
    },
    {
      icon: <Award className="h-6 w-6 text-blue-600" />,
      title: "Certified Technicians",
      description: "Highly trained and certified professionals"
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-600" />,
      title: "Quality Guarantee",
      description: "100% satisfaction guarantee on all services"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-primary transition-colors duration-200">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Professional Services
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Expert technical support, repairs, and installation services for all your electronics
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
            Get Started
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-dark-text-primary mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 dark:text-dark-text-secondary max-w-2xl mx-auto">
            We provide comprehensive technical services to keep your devices running smoothly
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="bg-white dark:bg-dark-secondary rounded-lg shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-200">
              <div className="flex items-center mb-4">
                {service.icon}
                <h3 className="text-xl font-semibold text-gray-800 dark:text-dark-text-primary ml-3">
                  {service.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-dark-text-secondary mb-4">
                {service.description}
              </p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-600 dark:text-dark-text-secondary">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <span className="text-xl sm:text-2xl font-bold text-blue-600 mb-4 sm:mb-0">
                  {service.price}
                </span>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-lg p-6 sm:p-8 transition-colors duration-200">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-dark-text-primary text-center mb-8">
            Why Choose Our Services?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-dark-text-primary mb-2">
                  {benefit.title}
                </h4>
                <p className="text-gray-600 dark:text-dark-text-secondary">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-800 dark:bg-dark-primary text-white transition-colors duration-200">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Need Help? Contact Us
              </h3>
              <p className="text-gray-300 dark:text-dark-text-secondary mb-6">
                Our expert technicians are ready to help you with any technical issues or questions.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Headphones className="h-5 w-5 text-blue-400 mr-3" />
                  <span>Phone: +254 (700) 123-456</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-blue-400 mr-3" />
                  <span>Hours: 24/7 Support Available</span>
                </div>
              </div>
            </div>
            <div>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 dark:text-dark-text-secondary mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-600 dark:border-dark-border rounded-lg bg-gray-700 dark:bg-dark-secondary text-white dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 dark:text-dark-text-secondary mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-600 dark:border-dark-border rounded-lg bg-gray-700 dark:bg-dark-secondary text-white dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 dark:text-dark-text-secondary mb-2">
                    Service Needed
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-600 dark:border-dark-border rounded-lg bg-gray-700 dark:bg-dark-secondary text-white dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Device Repair</option>
                    <option>Technical Support</option>
                    <option>Extended Warranty</option>
                    <option>Installation & Setup</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 dark:text-dark-text-secondary mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-600 dark:border-dark-border rounded-lg bg-gray-700 dark:bg-dark-secondary text-white dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your issue or request..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;