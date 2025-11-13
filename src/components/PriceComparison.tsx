import React from "react";
import { CheckCircle, X, Star, ArrowRight } from "lucide-react";

const PriceComparison = () => {
  const plans = [
    {
      name: "Starter",
      price: "$2,500",
      period: "/month",
      description: "Perfect for small teams and startups",
      popular: false,
      features: [
        { name: "Manual Testing", included: true },
        { name: "Basic Automation", included: true },
        { name: "Test Planning & Strategy", included: true },
        { name: "Bug Reporting & Tracking", included: true },
        { name: "Email Support", included: true },
        { name: "Monthly Reports", included: true },
        { name: "Performance Testing", included: false },
        { name: "Security Testing", included: false },
        { name: "Dedicated QA Manager", included: false },
        { name: "24/7 Support", included: false },
      ],
      cta: "Start Testing",
      color: "border-gray-200",
    },
    {
      name: "Professional",
      price: "$4,500",
      period: "/month",
      description: "Ideal for growing companies",
      popular: true,
      features: [
        { name: "Manual Testing", included: true },
        { name: "Advanced Automation", included: true },
        { name: "Test Planning & Strategy", included: true },
        { name: "Bug Reporting & Tracking", included: true },
        { name: "Priority Support", included: true },
        { name: "Weekly Reports", included: true },
        { name: "Performance Testing", included: true },
        { name: "Basic Security Testing", included: true },
        { name: "Dedicated QA Manager", included: true },
        { name: "24/7 Support", included: false },
      ],
      cta: "Most Popular",
      color: "border-teal-500",
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Tailored for large organizations",
      popular: false,
      features: [
        { name: "Manual Testing", included: true },
        { name: "Full Test Automation Suite", included: true },
        { name: "Custom Test Strategy", included: true },
        { name: "Advanced Reporting", included: true },
        { name: "Dedicated Support Team", included: true },
        { name: "Real-time Reports", included: true },
        { name: "Comprehensive Performance Testing", included: true },
        { name: "Full Security Testing", included: true },
        { name: "Senior QA Manager", included: true },
        { name: "24/7 Premium Support", included: true },
      ],
      cta: "Contact Sales",
      color: "border-gray-200",
    },
  ];

  const comparison = [
    {
      category: "Traditional QA Agencies",
      price: "$8,000 - $15,000/month",
      features: [
        "Long contract commitments",
        "Junior staff handling projects",
        "Slow communication",
        "Outdated methodologies",
        "High overhead costs",
      ],
      color: "bg-red-50 border-red-200",
    },
    {
      category: "InspecQ (New Agency)",
      price: "$2,500 - $6,000/month",
      features: [
        "Flexible engagement models",
        "Senior experts on every project",
        "Direct communication",
        "Modern tools & methods",
        "Competitive startup rates",
      ],
      color: "bg-teal-50 border-teal-200",
    },
    {
      category: "Freelance QA Engineers",
      price: "$50 - $150/hour",
      features: [
        "Limited availability",
        "Single point of failure",
        "No process standardization",
        "Variable quality",
        "No backup support",
      ],
      color: "bg-yellow-50 border-yellow-200",
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <CheckCircle className="h-4 w-4 mr-2" />
            Transparent Pricing
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Quality Testing at Startup-Friendly Rates
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            As a new agency, we offer competitive pricing without compromising
            on quality. Choose the plan that fits your testing needs and budget.
          </p>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-xl p-8 ${
                plan.popular
                  ? "bg-teal-50 border-2 border-teal-500 relative"
                  : "bg-white border-2 " + plan.color
              } hover:shadow-lg transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-teal-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    {feature.included ? (
                      <CheckCircle className="h-5 w-5 text-teal-600 mr-3" />
                    ) : (
                      <X className="h-5 w-5 text-gray-400 mr-3" />
                    )}
                    <span
                      className={
                        feature.included ? "text-gray-700" : "text-gray-400"
                      }
                    >
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-6 rounded-md font-semibold transition-colors duration-200 ${
                  plan.popular
                    ? "bg-teal-600 text-white hover:bg-teal-700"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
            How We Compare to Alternatives
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {comparison.map((option, index) => (
              <div
                key={index}
                className={`rounded-xl p-8 border-2 ${option.color}`}
              >
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  {option.category}
                </h4>
                <div className="text-2xl font-bold text-gray-900 mb-6">
                  {option.price}
                </div>
                <ul className="space-y-3">
                  {option.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 mr-3 ${
                          index === 1 ? "bg-teal-600" : "bg-gray-400"
                        }`}
                      ></div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-600 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Get a custom quote tailored to your specific testing needs and
            project requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teal-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2">
              <span>Get Free Quote</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-teal-600 transition-colors duration-200">
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceComparison;
