import React, { useState } from 'react';
import { X, CreditCard, Shield, Clock, Award } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';

const PurchaseModal = ({ isOpen, onClose, course }) => {
  const [selectedPlan, setSelectedPlan] = useState('basic');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handlePurchase = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert('Course enrolled successfully! Check your email for details.');
      onClose();
    }, 2000);
  };

  const plans = {
    basic: {
      name: 'Basic Access',
      price: course.courseFee,
      features: [
        'Complete course content',
        'Community access',
        'Basic support',
        'Certificate of completion',
      ],
    },
    premium: {
      name: 'Premium Access',
      price: course.courseFee * 1.5,
      features: [
        'Complete course content',
        'Priority community access',
        '1-on-1 mentor sessions',
        'Live Q&A sessions',
        'Premium certificate',
        'Career guidance',
        'Lifetime access',
      ],
    },
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative p-6 border-b border-gray-200">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900 pr-12">Enroll in Course</h2>
          <p className="text-gray-600 mt-1">Choose your learning plan and start your journey</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          {/* Course Info */}
          <div className="space-y-6">
            <div className="relative h-48 rounded-lg overflow-hidden bg-gray-200">
              <img
                src={
                  course?.courseImage
                    ? `http://localhost:3000/uploads/courses/${course.courseImage}`
                    : 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800'
                }
                alt={course.title}
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  e.target.src =
                    'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800';
                }}
              />
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.durationWeeks} weeks</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="h-4 w-4" />
                  <span>Certificate included</span>
                </div>
              </div>
            </div>

            {course.mentorIds?.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Your Instructors</h4>
                <div className="space-y-2">
                  {course.mentorIds.map((mentor, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                        <span className="text-red-600 font-medium">
                          {mentor.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-gray-700">{mentor.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-800">30-Day Money Back Guarantee</span>
              </div>
              <p className="text-sm text-green-700">
                Not satisfied? Get a full refund within 30 days, no questions asked.
              </p>
            </div>
          </div>

          {/* Pricing Plans */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Choose Your Plan</h3>

            {Object.entries(plans).map(([key, plan]) => (
              <Card
                key={key}
                className={`cursor-pointer border-2 transition-all ${
                  selectedPlan === key
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-red-300'
                }`}
                onClick={() => setSelectedPlan(key)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                    <p className="text-2xl font-bold text-red-600">{formatPrice(plan.price)}</p>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      selectedPlan === key ? 'bg-red-600 border-red-600' : 'border-gray-300'
                    }`}
                  >
                    {selectedPlan === key && (
                      <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                    )}
                  </div>
                </div>

                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}

            <div className="space-y-4 pt-4 border-t border-gray-200">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Course Fee</span>
                  <span className="font-semibold">
                    {formatPrice(plans[selectedPlan].price)}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Taxes</span>
                  <span className="font-semibold">₹0</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-red-600">
                      {formatPrice(plans[selectedPlan].price)}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                variant="red"
                size="lg"
                className="w-full"
                onClick={handlePurchase}
                loading={isProcessing}
                leftIcon={<CreditCard className="h-5 w-5" />}
              >
                {isProcessing ? 'Processing...' : 'Enroll Now'}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                By enrolling, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
