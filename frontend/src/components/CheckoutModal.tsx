import React, { useState } from 'react';
import { X, CreditCard, Smartphone, MapPin, User, Phone, Mail } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: any[];
  total: number;
  onCheckoutComplete: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  total,
  onCheckoutComplete
}) => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    mpesaPhone: ''
  });
  const [errors, setErrors] = useState<any>({});

  if (!isOpen) return null;

  const validateStep1 = () => {
    const newErrors: any = {};
    
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: any = {};
    
    if (paymentMethod === 'mpesa' && !formData.mpesaPhone) {
      newErrors.mpesaPhone = 'M-Pesa phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: '' }));
    }
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handlePreviousStep = () => {
    setStep(1);
  };

  const simulateMpesaPayment = async () => {
    // Simulate M-Pesa STK push
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, transactionId: 'MP' + Date.now() });
      }, 3000);
    });
  };

  const handlePayment = async () => {
    if (!validateStep2()) return;

    setIsProcessing(true);

    try {
      if (paymentMethod === 'mpesa') {
        // Simulate M-Pesa payment
        const result = await simulateMpesaPayment();
        console.log('M-Pesa payment result:', result);
      }

      // Simulate order creation
      const order = {
        id: 'ORD-' + Date.now(),
        items: cartItems,
        total: total,
        customer: formData,
        paymentMethod: paymentMethod,
        status: 'confirmed',
        date: new Date().toISOString()
      };

      console.log('Order created:', order);
      
      // Store order in localStorage (in real app, this would be sent to backend)
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      existingOrders.push(order);
      localStorage.setItem('orders', JSON.stringify(existingOrders));

      onCheckoutComplete();
      onClose();
      
      // Show success message
      alert('Payment successful! Your order has been confirmed.');
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-dark-text-primary">
              Checkout
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center mb-8">
            <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                1
              </div>
              <span className="ml-2 font-medium">Shipping</span>
            </div>
            <div className="flex-1 h-1 mx-4 bg-gray-300">
              <div className={`h-full ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'} transition-all duration-300`} />
            </div>
            <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                2
              </div>
              <span className="ml-2 font-medium">Payment</span>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text-primary mb-4">
                Shipping Information
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-dark-tertiary text-gray-900 dark:text-dark-text-primary ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-dark-border'
                      }`}
                    />
                  </div>
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-dark-tertiary text-gray-900 dark:text-dark-text-primary ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300 dark:border-dark-border'
                      }`}
                    />
                  </div>
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-dark-tertiary text-gray-900 dark:text-dark-text-primary ${
                      errors.email ? 'border-red-500' : 'border-gray-300 dark:border-dark-border'
                    }`}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-dark-tertiary text-gray-900 dark:text-dark-text-primary ${
                      errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-dark-border'
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">
                  Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-dark-tertiary text-gray-900 dark:text-dark-text-primary ${
                      errors.address ? 'border-red-500' : 'border-gray-300 dark:border-dark-border'
                    }`}
                  />
                </div>
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-dark-tertiary text-gray-900 dark:text-dark-text-primary ${
                      errors.city ? 'border-red-500' : 'border-gray-300 dark:border-dark-border'
                    }`}
                  />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-dark-tertiary text-gray-900 dark:text-dark-text-primary"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNextStep}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text-primary">
                Payment Method
              </h3>

              <div className="space-y-4">
                <div className="border border-gray-300 dark:border-dark-border rounded-lg p-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="mpesa"
                      checked={paymentMethod === 'mpesa'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <Smartphone className="h-6 w-6 text-green-600 mr-3" />
                    <div>
                      <div className="font-medium text-gray-800 dark:text-dark-text-primary">M-Pesa</div>
                      <div className="text-sm text-gray-600 dark:text-dark-text-muted">Pay with M-Pesa mobile money</div>
                    </div>
                  </label>
                </div>

                <div className="border border-gray-300 dark:border-dark-border rounded-lg p-4 opacity-50">
                  <label className="flex items-center cursor-not-allowed">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      disabled
                      className="mr-3"
                    />
                    <CreditCard className="h-6 w-6 text-gray-400 mr-3" />
                    <div>
                      <div className="font-medium text-gray-400">Credit/Debit Card</div>
                      <div className="text-sm text-gray-400">Coming soon</div>
                    </div>
                  </label>
                </div>
              </div>

              {paymentMethod === 'mpesa' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">
                    M-Pesa Phone Number
                  </label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="tel"
                      name="mpesaPhone"
                      value={formData.mpesaPhone}
                      onChange={handleInputChange}
                      placeholder="254700123456"
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-dark-tertiary text-gray-900 dark:text-dark-text-primary ${
                        errors.mpesaPhone ? 'border-red-500' : 'border-gray-300 dark:border-dark-border'
                      }`}
                    />
                  </div>
                  {errors.mpesaPhone && <p className="text-red-500 text-xs mt-1">{errors.mpesaPhone}</p>}
                  <p className="text-sm text-gray-600 dark:text-dark-text-muted mt-1">
                    You will receive an STK push to complete the payment
                  </p>
                </div>
              )}

              {/* Order Summary */}
              <div className="bg-gray-50 dark:bg-dark-tertiary rounded-lg p-4">
                <h4 className="font-medium text-gray-800 dark:text-dark-text-primary mb-3">Order Summary</h4>
                <div className="space-y-2">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-dark-text-muted">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="text-gray-800 dark:text-dark-text-primary">
                        KSh {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-gray-300 dark:border-dark-border pt-2 mt-2">
                    <div className="flex justify-between font-medium">
                      <span className="text-gray-800 dark:text-dark-text-primary">Total</span>
                      <span className="text-gray-800 dark:text-dark-text-primary">KSh {total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={handlePreviousStep}
                  className="border border-gray-300 dark:border-dark-border text-gray-700 dark:text-dark-text-secondary px-6 py-2 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-dark-tertiary transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {isProcessing ? 'Processing...' : `Pay KSh ${total.toLocaleString()}`}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;