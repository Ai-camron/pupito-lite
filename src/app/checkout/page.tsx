'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Lock, 
  Truck, 
  ArrowLeft,
  Check
} from 'lucide-react'
import Link from 'next/link'
import OnlineStoreCallout from '@/components/OnlineStoreCallout'

interface CheckoutStep {
  id: number
  title: string
  completed: boolean
}

interface PaymentMethod {
  id: string
  name: string
  icon: string
  description: string
}

const paymentMethods: PaymentMethod[] = [
  { id: 'card', name: 'Credit/Debit Card', icon: '💳', description: 'Visa, Mastercard, American Express' },
  { id: 'paypal', name: 'PayPal', icon: '🟦', description: 'Pay with your PayPal account' },
  { id: 'apple', name: 'Apple Pay', icon: '🍎', description: 'Touch ID or Face ID' },
  { id: 'google', name: 'Google Pay', icon: '🔵', description: 'Pay with Google' }
]

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Shipping Info
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: '',
    
    // Payment Info
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    
    // Options
    saveInfo: false,
    giftMessage: '',
    newsletter: false
  })

  const steps: CheckoutStep[] = [
    { id: 1, title: 'Information', completed: currentStep > 1 },
    { id: 2, title: 'Shipping', completed: currentStep > 2 },
    { id: 3, title: 'Payment', completed: currentStep > 3 }
  ]

  // Mock order data
  const orderSummary = {
    items: [
      { name: 'Neon Samurai Hoodie', price: 89.99, quantity: 1, size: 'L', color: 'Neon Pink' },
      { name: 'Tokyo Nights Tee', price: 34.99, quantity: 2, size: 'M', color: 'Black' }
    ],
    subtotal: 159.97,
    shipping: 0,
    tax: 12.80,
    total: 172.77
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Process order logic here
    console.log('Order submitted:', formData)
    // Redirect to confirmation page
  }

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-linear-to-r from-[#22d3ee] via-[#1E90FF] to-[#FFD700] bg-clip-text text-transparent mb-4">
            CHECKOUT
          </h1>
          
          {/* Progress Steps */}
          <div className="flex justify-center items-center gap-4 max-w-md mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${
                  step.id === currentStep
                    ? 'border-[#22d3ee] bg-[#22d3ee] text-black'
                    : step.completed
                    ? 'border-green-500 bg-green-500 text-white'
                    : 'border-gray-600 text-gray-400'
                }`}>
                  {step.completed ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
                <span className={`ml-2 text-sm ${
                  step.id === currentStep ? 'text-[#22d3ee]' : 'text-gray-400'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className="w-8 h-0.5 bg-gray-600 mx-4" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Back to Cart */}
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 text-[#22d3ee] hover:text-[#0ea5e9] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Cart
            </Link>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Contact Information */}
              {currentStep >= 1 && (
                <div className="bg-[#1A1A1A] border border-[#22d3ee]/30 rounded-xl p-6">
                  <h3 className="text-white font-semibold text-lg mb-6">Contact Information</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-3 py-3 bg-[#0D0D0D] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#22d3ee] focus:outline-none transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-3 py-3 bg-[#0D0D0D] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#22d3ee] focus:outline-none transition-colors"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full px-3 py-3 bg-[#0D0D0D] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#22d3ee] focus:outline-none transition-colors"
                        placeholder="First name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full px-3 py-3 bg-[#0D0D0D] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#22d3ee] focus:outline-none transition-colors"
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Shipping Address */}
              {currentStep >= 2 && (
                <div className="bg-[#1A1A1A] border border-[#22d3ee]/30 rounded-xl p-6">
                  <h3 className="text-white font-semibold text-lg mb-6">Shipping Address</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Address *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="w-full px-3 py-3 bg-[#0D0D0D] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#22d3ee] focus:outline-none transition-colors"
                        placeholder="123 Main Street"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Apartment, suite, etc. (optional)
                      </label>
                      <input
                        type="text"
                        value={formData.apartment}
                        onChange={(e) => handleInputChange('apartment', e.target.value)}
                        className="w-full px-3 py-3 bg-[#0D0D0D] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#22d3ee] focus:outline-none transition-colors"
                        placeholder="Apartment, suite, unit, etc."
                      />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className="w-full px-3 py-3 bg-[#0D0D0D] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#22d3ee] focus:outline-none transition-colors"
                          placeholder="City"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="state" className="block text-gray-300 text-sm font-medium mb-2">
                          State *
                        </label>
                        <select
                          id="state"
                          required
                          value={formData.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          className="w-full px-3 py-3 bg-[#0D0D0D] border border-gray-600 rounded-lg text-white focus:border-[#22d3ee] focus:outline-none transition-colors"
                        >
                          <option value="">Select State</option>
                          <option value="CA">California</option>
                          <option value="NY">New York</option>
                          <option value="TX">Texas</option>
                          {/* Add more states */}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange('zipCode', e.target.value)}
                          className="w-full px-3 py-3 bg-[#0D0D0D] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#22d3ee] focus:outline-none transition-colors"
                          placeholder="12345"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {currentStep >= 3 && (
                <div className="bg-[#1A1A1A] border border-[#22d3ee]/30 rounded-xl p-6">
                  <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-green-400" />
                    Payment Information
                  </h3>
                  
                  {/* Payment Method Selection */}
                  <div className="space-y-3 mb-6">
                    {paymentMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.paymentMethod === method.id
                            ? 'border-[#22d3ee] bg-[#22d3ee]/10'
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={formData.paymentMethod === method.id}
                          onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                          className="sr-only"
                        />
                        <span className="text-2xl">{method.icon}</span>
                        <div>
                          <div className="text-white font-medium">{method.name}</div>
                          <div className="text-gray-400 text-sm">{method.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* Card Details */}
                  {formData.paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                          className="w-full px-3 py-3 bg-[#0D0D0D] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#22d3ee] focus:outline-none transition-colors"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-2">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.expiryDate}
                            onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                            className="w-full px-3 py-3 bg-[#0D0D0D] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#22d3ee] focus:outline-none transition-colors"
                            placeholder="MM/YY"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-2">
                            CVV *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.cvv}
                            onChange={(e) => handleInputChange('cvv', e.target.value)}
                            className="w-full px-3 py-3 bg-[#0D0D0D] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#22d3ee] focus:outline-none transition-colors"
                            placeholder="123"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                          Name on Card *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.nameOnCard}
                          onChange={(e) => handleInputChange('nameOnCard', e.target.value)}
                          className="w-full px-3 py-3 bg-[#0D0D0D] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#22d3ee] focus:outline-none transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 border border-[#22d3ee] text-[#22d3ee] rounded-lg hover:bg-[#22d3ee] hover:text-black transition-colors"
                  >
                    Previous
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 bg-[#22d3ee] text-black rounded-lg hover:bg-[#0ea5e9] transition-colors"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-8 py-3 bg-linear-to-r from-[#22d3ee] to-[#0ea5e9] hover:from-[#1E90FF] hover:to-[#00FFFF] text-black hover:text-white font-bold rounded-xl transition-all duration-300"
                  >
                    Complete Order
                  </button>
                )}
              </div>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-8 h-fit"
          >
            <div className="bg-[#1A1A1A] border border-[#22d3ee]/30 rounded-xl p-6">
              <h3 className="text-white font-semibold text-lg mb-6">Order Summary</h3>
              
              {/* Items */}
              <div className="space-y-4 mb-6">
                {orderSummary.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{item.name}</h4>
                      <p className="text-gray-400 text-sm">
                        {item.size} • {item.color} • Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="text-[#22d3ee] font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 text-gray-300 border-t border-gray-600 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${orderSummary.subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1">
                    Shipping
                    <Truck className="w-4 h-4 text-green-400" />
                  </span>
                  <span className="text-green-400">FREE</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${orderSummary.tax.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-white font-bold text-lg border-t border-gray-600 pt-3">
                  <span>Total</span>
                  <span>${orderSummary.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <Lock className="w-4 h-4" />
                  <span className="font-medium">Secure Checkout</span>
                </div>
                <p className="text-green-300 text-xs mt-1">
                  Your payment information is encrypted and secure
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Online Store Info */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <OnlineStoreCallout variant="compact" />
        </div>
      </div>
    </div>
  )
}
