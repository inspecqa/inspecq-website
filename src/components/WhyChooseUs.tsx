import React from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  Users,
  Clock,
  Award,
  Target,
  Zap,
  Shield,
  Code,
  ArrowRight,
} from "lucide-react";

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: Users,
      title: "Expert Team from Top Companies",
      description:
        "Our founders and team members bring experience from Google, Microsoft, Amazon, and other industry leaders.",
      color: "bg-teal-500",
    },
    {
      icon: Clock,
      title: "Fast Turnaround Times",
      description:
        "As a lean startup, we move quickly without compromising quality. Get results faster than traditional agencies.",
      color: "bg-blue-500",
    },
    {
      icon: Award,
      title: "Competitive Startup Rates",
      description:
        "Premium quality at startup-friendly prices. We offer competitive rates as we build our client portfolio.",
      color: "bg-purple-500",
    },
    {
      icon: Target,
      title: "Personalized Attention",
      description:
        "Every client gets direct access to our senior team. No junior staff or outsourced work - just expert attention.",
      color: "bg-orange-500",
    },
    {
      icon: Zap,
      title: "Modern Tools & Methodologies",
      description:
        "We use the latest testing tools and agile methodologies to deliver efficient, comprehensive testing solutions.",
      color: "bg-teal-500",
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description:
        "We stand behind our work with a 100% satisfaction guarantee. Your success is our reputation.",
      color: "bg-red-500",
    },
    {
      icon: Code,
      title: "Full-Stack Expertise",
      description:
        "From frontend to backend, mobile to web, APIs to databases - we test it all with deep technical knowledge.",
      color: "bg-indigo-500",
    },
    {
      icon: CheckCircle,
      title: "Transparent Communication",
      description:
        "Regular updates, clear reporting, and open communication throughout the entire testing process.",
      color: "bg-green-500",
    },
  ];

  return (
    <section
      id="why-choose-us"
      className="py-20 bg-gradient-to-br from-purple-50 via-white to-teal-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <CheckCircle className="h-4 w-4 mr-2" />
            Why Choose InspecQ
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Partner with a New QA Agency?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            While we're new as an agency, our team brings proven expertise and
            fresh energy to deliver exceptional results for your testing needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 group"
            >
              <div
                className={`${reason.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <reason.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {reason.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-teal-600 to-teal-600 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Be Our First Success Story?
          </h3>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Join us as we launch our QA agency. Get premium testing services at
            competitive rates and help us build our portfolio of success
            stories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teal-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors duration-200">
              Get Free Quote
            </button>
            <Link
              to="/pricing"
              className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-teal-600 transition-colors duration-200 inline-flex items-center justify-center space-x-2"
            >
              <span>View Pricing</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
