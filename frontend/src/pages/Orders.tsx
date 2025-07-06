import React, { useState } from 'react';
import { Search, Package, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);

  const orders = [
    {
      id: 1,
      orderNumber: "ORD-2024-001",
      date: "2024-01-15",
      status: "delivered",
      total: 239700.00,
      items: [
        { name: "iPhone 15 Pro Max", quantity: 1, price: 179900.00 },
        { name: "iPhone Case", quantity: 1, price: 4350.00 },
        { name: "Wireless Charger", quantity: 1, price: 7350.00 }
      ],
      trackingNumber: "1Z999AA1234567890",
      deliveryAddress: "123 Main St, Nairobi, Kenya",
      estimatedDelivery: "2024-01-18",
      timeline: [
        { status: "Order Placed", date: "2024-01-15 10:30 AM", completed: true },
        { status: "Processing", date: "2024-01-15 2:45 PM", completed: true },
        { status: "Shipped", date: "2024-01-16 8:20 AM", completed: true },
        { status: "Out for Delivery", date: "2024-01-18 9:15 AM", completed: true },
        { status: "Delivered", date: "2024-01-18 2:30 PM", completed: true }
      ]
    },
    {
      id: 2,
      orderNumber: "ORD-2024-002",
      date: "2024-01-20",
      status: "shipping",
      total: 134850.00,
      items: [
        { name: "Gaming Laptop", quantity: 1, price: 134850.00 }
      ],
      trackingNumber: "1Z999AA1234567891",
      deliveryAddress: "456 Oak Ave, Mombasa, Kenya",
      estimatedDelivery: "2024-01-25",
      timeline: [
        { status: "Order Placed", date: "2024-01-20 11:15 AM", completed: true },
        { status: "Processing", date: "2024-01-20 3:20 PM", completed: true },
        { status: "Shipped", date: "2024-01-21 10:45 AM", completed: true },
        { status: "Out for Delivery", date: "", completed: false },
        { status: "Delivered", date: "", completed: false }
      ]
    },
    {
      id: 3,
      orderNumber: "ORD-2024-003",
      date: "2024-01-22",
      status: "processing",
      total: 68850.00,
      items: [
        { name: "Wireless Headphones", quantity: 1, price: 44900.00 },
        { name: "Phone Stand", quantity: 2, price: 11975.00 }
      ],
      trackingNumber: "TBD",
      deliveryAddress: "789 Pine Rd, Kisumu, Kenya",
      estimatedDelivery: "2024-01-28",
      timeline: [
        { status: "Order Placed", date: "2024-01-22 9:45 AM", completed: true },
        { status: "Processing", date: "2024-01-22 1:30 PM", completed: true },
        { status: "Shipped", date: "", completed: false },
        { status: "Out for Delivery", date: "", completed: false },
        { status: "Delivered", date: "", completed: false }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'shipping':
        return <Truck className="h-5 w-5 text-blue-500" />;
      case 'processing':
        return <Package className="h-5 w-5 text-yellow-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'shipping':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      case 'processing':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      default:
        return 'bg-gray-100 dark:bg-dark-tertiary text-gray-800 dark:text-dark-text-secondary';
    }
  };

  const filteredOrders = orders.filter(order =>
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-primary transition-colors duration-200">
      {/* Header */}
      <div className="bg-white dark:bg-dark-secondary shadow-sm transition-colors duration-200">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-dark-text-primary mb-4">
            Your Orders
          </h1>
          <p className="text-lg text-gray-600 dark:text-dark-text-secondary">
            Track and manage your orders
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-dark-secondary text-gray-900 dark:text-dark-text-primary placeholder-gray-500 dark:placeholder-dark-text-muted"
            />
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-400 dark:text-dark-text-muted" />
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white dark:bg-dark-secondary rounded-lg shadow-md overflow-hidden transition-colors duration-200">
              <div className="p-4 sm:p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                    {getStatusIcon(order.status)}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text-primary">
                        {order.orderNumber}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-dark-text-muted">
                        Placed on {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <span className="text-lg font-bold text-gray-800 dark:text-dark-text-primary">
                      KSh {order.total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Items */}
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-dark-text-primary mb-2">Items</h4>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-dark-text-muted">
                            {item.name} x{item.quantity}
                          </span>
                          <span className="text-gray-800 dark:text-dark-text-primary">
                            KSh {item.price.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-dark-text-primary mb-2">Delivery Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 text-gray-400 dark:text-dark-text-muted mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-dark-text-muted">{order.deliveryAddress}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 dark:text-dark-text-muted mr-2" />
                        <span className="text-gray-600 dark:text-dark-text-muted">
                          Expected: {new Date(order.estimatedDelivery).toLocaleDateString()}
                        </span>
                      </div>
                      {order.trackingNumber !== "TBD" && (
                        <div className="flex items-center">
                          <Package className="h-4 w-4 text-gray-400 dark:text-dark-text-muted mr-2" />
                          <span className="text-gray-600 dark:text-dark-text-muted">
                            Tracking: {order.trackingNumber}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Track Order Button */}
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    {selectedOrder === order.id ? 'Hide Details' : 'Track Order'}
                  </button>
                </div>

                {/* Order Timeline */}
                {selectedOrder === order.id && (
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-border">
                    <h4 className="font-medium text-gray-800 dark:text-dark-text-primary mb-4">Order Timeline</h4>
                    <div className="space-y-4">
                      {order.timeline.map((event, index) => (
                        <div key={index} className="flex items-start">
                          <div className={`w-4 h-4 rounded-full mr-4 mt-1 flex-shrink-0 ${
                            event.completed ? 'bg-green-500' : 'bg-gray-300 dark:bg-dark-border'
                          }`} />
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                              <span className={`font-medium ${
                                event.completed ? 'text-gray-800 dark:text-dark-text-primary' : 'text-gray-500 dark:text-dark-text-muted'
                              }`}>
                                {event.status}
                              </span>
                              <span className={`text-sm ${
                                event.completed ? 'text-gray-600 dark:text-dark-text-muted' : 'text-gray-400 dark:text-dark-text-muted'
                              }`}>
                                {event.date}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 dark:text-dark-text-muted mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 dark:text-dark-text-primary mb-2">
              No orders found
            </h3>
            <p className="text-gray-600 dark:text-dark-text-muted">
              {searchTerm ? 'Try adjusting your search terms' : 'You haven\'t placed any orders yet'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;