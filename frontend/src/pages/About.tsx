import React from 'react';
import { Users, Award, Globe, Heart } from 'lucide-react';

const About = () => {
  const stats = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      number: "50K+",
      label: "Happy Customers"
    },
    {
      icon: <Award className="h-8 w-8 text-blue-600" />,
      number: "15+",
      label: "Years Experience"
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-600" />,
      number: "100+",
      label: "Countries Served"
    },
    {
      icon: <Heart className="h-8 w-8 text-blue-600" />,
      number: "99%",
      label: "Customer Satisfaction"
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Tech industry veteran with 20+ years of experience in electronics retail."
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Former Silicon Valley engineer passionate about bringing latest tech to everyone."
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Customer Experience",
      image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Dedicated to ensuring every customer has an exceptional experience."
    },
    {
      name: "David Kim",
      role: "Head of Operations",
      image: "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Logistics expert ensuring fast and reliable delivery worldwide."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-primary transition-colors duration-200">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              About TechStore
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8">
              Your trusted partner in the digital revolution, bringing you the latest technology with unmatched service since 2008.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-800 dark:text-dark-text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-dark-text-secondary">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Story Section */}
      <div className="bg-white dark:bg-dark-secondary transition-colors duration-200">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-dark-text-primary mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 dark:text-dark-text-secondary mb-4">
                Founded in 2008, TechStore began as a small electronics retailer with a simple mission: to make cutting-edge technology accessible to everyone. What started as a single store has grown into a global platform serving customers in over 100 countries.
              </p>
              <p className="text-lg text-gray-600 dark:text-dark-text-secondary mb-4">
                We believe that technology should enhance lives, not complicate them. That's why we carefully curate every product in our catalog, ensuring it meets our high standards for quality, innovation, and value.
              </p>
              <p className="text-lg text-gray-600 dark:text-dark-text-secondary">
                Today, we're proud to be a trusted name in electronics retail, known for our exceptional customer service, competitive prices, and commitment to bringing you the latest and greatest in technology.
              </p>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Our Story"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Values */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-dark-text-primary mb-4">
            Our Mission & Values
          </h2>
          <p className="text-lg text-gray-600 dark:text-dark-text-secondary max-w-3xl mx-auto">
            We're driven by a set of core values that guide everything we do
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-lg p-8 text-center transition-colors duration-200">
            <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-dark-text-primary mb-4">
              Quality First
            </h3>
            <p className="text-gray-600 dark:text-dark-text-secondary">
              We never compromise on quality. Every product undergoes rigorous testing and evaluation before reaching our customers.
            </p>
          </div>

          <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-lg p-8 text-center transition-colors duration-200">
            <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-dark-text-primary mb-4">
              Customer Focus
            </h3>
            <p className="text-gray-600 dark:text-dark-text-secondary">
              Our customers are at the heart of everything we do. We listen, learn, and continuously improve to exceed expectations.
            </p>
          </div>

          <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-lg p-8 text-center transition-colors duration-200">
            <div className="bg-purple-100 dark:bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-dark-text-primary mb-4">
              Innovation
            </h3>
            <p className="text-gray-600 dark:text-dark-text-secondary">
              We stay ahead of the curve, constantly seeking new technologies and innovations to bring to our customers.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white dark:bg-dark-secondary transition-colors duration-200">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-dark-text-primary mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 dark:text-dark-text-secondary max-w-2xl mx-auto">
              The passionate individuals behind TechStore who work tirelessly to serve you better
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-dark-text-primary mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-dark-text-secondary text-sm">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-800 dark:bg-dark-primary text-white transition-colors duration-200">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience the Difference?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust TechStore for their technology needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors">
              Shop Now
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-gray-800 px-8 py-3 rounded-lg text-lg font-semibold transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;