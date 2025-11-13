// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   Play,
//   CheckCircle,
//   Calendar,
//   Clock,
//   Users,
//   ArrowRight,
//   Monitor,
//   Smartphone,
//   Globe,
// } from "lucide-react";
// import { useFormSubmission } from "../hooks/useFormSubmission";

// const Demo = () => {
//   const { submitForm, isSubmitting } = useFormSubmission();
//   const [selectedDemo, setSelectedDemo] = useState("platform");
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     company: "",
//     role: "",
//     preferredTime: "",
//     interests: [],
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const demoData = {
//       ...formData,
//       demoType: demoTypes.find((d) => d.id === selectedDemo)?.title,
//     };

//     const result = await submitForm(demoData, "Demo Request", "Demo Page");

//     if (result.success) {
//       alert(
//         "Demo scheduled successfully! You'll receive a calendar invite shortly."
//       );
//       setFormData({
//         name: "",
//         email: "",
//         company: "",
//         role: "",
//         preferredTime: "",
//         interests: [],
//       });
//     } else {
//       alert("There was an error scheduling your demo. Please try again.");
//     }
//   };

//   const demoTypes = [
//     {
//       id: "platform",
//       title: "Functional Testing Overview",
//       duration: "30 minutes",
//       description:
//         "A comprehensive tour of our functional testing process and capabilities",
//       features: [
//         "Step-by-Step Testing Strategy",
//         "Test execution workflow",
//         "Insights on improving test coverage",
//         "Expert tips tailored to your product",
//       ],
//       icon: Monitor,
//     },
//     {
//       id: "automation",
//       title: "Test Automation Overview",
//       duration: "30 minutes",
//       description: "Deep dive into our automation capabilities and framework",
//       features: [
//         "Automation setup",
//         "Script creation",
//         "CI/CD integration",
//         "Maintenance tools",
//       ],
//       icon: Play,
//     },
//     {
//       id: "mobile",
//       title: "Mobile Testing Overview",
//       duration: "30 minutes",
//       description: "Specialized demo focusing on mobile testing solutions",
//       features: [
//         "Device cloud",
//         "Cross-platform testing",
//         "Performance testing",
//         "Expert guidance for mobile app QA best practices",
//       ],
//       icon: Smartphone,
//     },
//     {
//       id: "enterprise",
//       title: "Enterprise Solution",
//       duration: "30 minutes",
//       description: "Comprehensive demo for enterprise-level requirements",
//       features: [
//         "Scalability features",
//         "Security & compliance",
//         "Collaboration-friendly workflows",
//         "Support options",
//       ],
//       icon: Globe,
//     },
//   ];

//   const timeSlots = [
//     "9:00 AM - 9:30 AM",
//     "10:00 AM - 10:30 AM",
//     "11:00 AM - 11:30 AM",
//     "2:00 PM - 2:30 PM",
//     "3:00 PM - 3:30 PM",
//     "4:00 PM - 4:30 PM",
//   ];

//   const benefits = [
//     // {
//     //   title: 'See It in Action',
//     //   description: 'Watch our platform solve real testing challenges live',
//     //   icon: Play
//     // },
//     {
//       title: "Ask Questions",
//       description: "Get answers from our testing experts in real-time",
//       icon: Users,
//     },
//     {
//       title: "Custom Scenarios",
//       description: "We'll tailor the demo to your specific use cases",
//       icon: CheckCircle,
//     },
//   ];

//   return (
//     <div className="pt-16">
//       {/* Hero Section */}
//       <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <div className="inline-flex items-center bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
//               <Play className="h-4 w-4 mr-2" />
//               Interactive Demo
//             </div>
//             <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//               See InspecQ in Action
//             </h1>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
//               Schedule a personalized demo with our experts and discover how
//               InspecQ can transform your testing process and improve software
//               quality.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <button
//                 onClick={() =>
//                   document
//                     .getElementById("demo-form")
//                     ?.scrollIntoView({ behavior: "smooth" })
//                 }
//                 className="bg-teal-600 text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-teal-700 transition-colors duration-200 flex items-center justify-center space-x-2"
//               >
//                 <Calendar className="h-5 w-5" />
//                 <span>Schedule Demo</span>
//               </button>
//               <Link
//                 to="/free-trial"
//                 className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-md font-semibold text-lg hover:bg-gray-50 transition-colors duration-200"
//               >
//                 Start Free Trial
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Demo Benefits */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Why Schedule a Demo?
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Get a personalized experience that shows exactly how InspecQ fits
//               your needs.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
//             {benefits.map((benefit, index) => (
//               <div
//                 key={index}
//                 className="text-center p-8 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 group"
//               >
//                 <div className="bg-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
//                   <benefit.icon className="h-8 w-8 text-white" />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-3">
//                   {benefit.title}
//                 </h3>
//                 <p className="text-gray-600">{benefit.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Demo Types */}
//       <section className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Choose Your Demo Type
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Select the demo that best matches your interests and requirements.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {demoTypes.map((demo) => (
//               <div
//                 key={demo.id}
//                 className={`p-8 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
//                   selectedDemo === demo.id
//                     ? "border-teal-500 bg-teal-50"
//                     : "border-gray-200 bg-white hover:border-teal-300 hover:shadow-md"
//                 }`}
//                 onClick={() => setSelectedDemo(demo.id)}
//               >
//                 <div className="flex items-start space-x-4">
//                   <div
//                     className={`p-3 rounded-lg ${
//                       selectedDemo === demo.id ? "bg-teal-600" : "bg-gray-400"
//                     }`}
//                   >
//                     <demo.icon className="h-6 w-6 text-white" />
//                   </div>
//                   <div className="flex-1">
//                     <div className="flex items-center justify-between mb-2">
//                       <h3 className="text-xl font-bold text-gray-900">
//                         {demo.title}
//                       </h3>
//                       <div className="flex items-center text-gray-600">
//                         <Clock className="h-4 w-4 mr-1" />
//                         <span className="text-sm">{demo.duration}</span>
//                       </div>
//                     </div>
//                     <p className="text-gray-600 mb-4">{demo.description}</p>
//                     <ul className="space-y-2">
//                       {demo.features.map((feature, index) => (
//                         <li
//                           key={index}
//                           className="flex items-center text-gray-700"
//                         >
//                           <CheckCircle className="h-4 w-4 text-teal-600 mr-3" />
//                           {feature}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Demo Form */}
//       <section id="demo-form" className="py-20 bg-white">
//         <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Schedule Your Demo
//             </h2>
//             <p className="text-xl text-gray-600">
//               Fill out the form below and we'll get back to you within 24 hours
//               to confirm your demo.
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label
//                   htmlFor="name"
//                   className="block text-sm font-medium text-gray-700 mb-2"
//                 >
//                   Full Name *
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200"
//                   placeholder="John Doe"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-gray-700 mb-2"
//                 >
//                   Email Address *
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200"
//                   placeholder="john@company.com"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label
//                   htmlFor="company"
//                   className="block text-sm font-medium text-gray-700 mb-2"
//                 >
//                   Company Name *
//                 </label>
//                 <input
//                   type="text"
//                   id="company"
//                   name="company"
//                   value={formData.company}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200"
//                   placeholder="Your Company"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="role"
//                   className="block text-sm font-medium text-gray-700 mb-2"
//                 >
//                   Your Role *
//                 </label>
//                 <select
//                   id="role"
//                   name="role"
//                   value={formData.role}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200"
//                 >
//                   <option value="">Select your role</option>
//                   <option value="qa-manager">QA Manager</option>
//                   <option value="test-engineer">Test Engineer</option>
//                   <option value="dev-manager">Development Manager</option>
//                   <option value="cto">CTO/Technical Lead</option>
//                   <option value="product-manager">Product Manager</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="preferredTime"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Preferred Time Slot
//               </label>
//               <select
//                 id="preferredTime"
//                 name="preferredTime"
//                 value={formData.preferredTime}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200"
//               >
//                 <option value="">Select preferred time</option>
//                 {timeSlots.map((slot, index) => (
//                   <option key={index} value={slot}>
//                     {slot} (PST)
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="bg-gray-50 p-6 rounded-lg">
//               <h4 className="font-semibold text-gray-900 mb-3">
//                 Selected Demo Type:
//               </h4>
//               <div className="flex items-center space-x-3">
//                 <div className="bg-teal-600 p-2 rounded-lg">
//                   {React.createElement(
//                     demoTypes.find((d) => d.id === selectedDemo)?.icon ||
//                       Monitor,
//                     {
//                       className: "h-5 w-5 text-white",
//                     }
//                   )}
//                 </div>
//                 <div>
//                   <div className="font-medium text-gray-900">
//                     {demoTypes.find((d) => d.id === selectedDemo)?.title}
//                   </div>
//                   <div className="text-sm text-gray-600">
//                     {demoTypes.find((d) => d.id === selectedDemo)?.duration}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full bg-teal-600 text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-teal-700 transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
//             >
//               <Calendar className="h-5 w-5" />
//               <span>{isSubmitting ? "Scheduling..." : "Schedule Demo"}</span>
//             </button>

//             <p className="text-sm text-gray-500 text-center">
//               We'll send you a calendar invite within 24 hours to confirm your
//               demo.
//             </p>
//           </form>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-600">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//             Can't Wait for a Demo?
//           </h2>
//           <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
//             Start exploring InspecQ immediately with our free trial - no demo
//             required.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link
//               to="/free-trial"
//               className="bg-white text-teal-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2"
//             >
//               <span>Start Free Trial</span>
//               <ArrowRight className="h-5 w-5" />
//             </Link>
//             <Link
//               to="/contact"
//               className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-teal-600 transition-colors duration-200"
//             >
//               Contact Sales
//             </Link>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Demo;
