import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Heart,
  Zap,
  Award,
} from "lucide-react";

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description:
        "Comprehensive health insurance, dental, vision, and wellness programs",
    },
    {
      icon: Clock,
      title: "Work-Life Balance",
      description:
        "Flexible hours, remote work options, and unlimited PTO policy",
    },
    {
      icon: Zap,
      title: "Growth & Learning",
      description:
        "Professional development budget, conferences, and certification support",
    },
    {
      icon: Award,
      title: "Recognition",
      description:
        "Performance bonuses, equity options, and peer recognition programs",
    },
  ];

  const jobs = [
    {
      id: 1,
      title: "Founding QA Engineer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$90k - $130k + Equity",
      description:
        "Join our founding team as we build InspecQ from the ground up. Shape our testing processes and help establish our reputation.",
      requirements: [
        "3+ years QA experience",
        "Test automation skills",
        "Startup mindset",
        "Full-stack testing",
      ],
      posted: "2 days ago",
    },
    {
      id: 2,
      title: "Junior QA Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      salary: "$60k - $80k + Equity",
      description:
        "Start your QA career with a growing startup. Learn from experienced professionals while contributing to exciting projects.",
      requirements: [
        "1+ years QA experience",
        "Basic automation knowledge",
        "Eagerness to learn",
        "Team player",
      ],
      posted: "1 week ago",
    },
    {
      id: 3,
      title: "Client Success Manager",
      department: "Sales",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$70k - $100k + Equity",
      description:
        "Help build relationships with our first clients and ensure their success. Be part of establishing our reputation in the market.",
      requirements: [
        "2+ years client-facing experience",
        "Technical aptitude",
        "Excellent communication",
        "Startup experience preferred",
      ],
      posted: "3 days ago",
    },
  ];

  const departments = [
    { id: "all", name: "All Departments", count: jobs.length },
    {
      id: "Engineering",
      name: "Engineering",
      count: jobs.filter((job) => job.department === "Engineering").length,
    },
    {
      id: "Security",
      name: "Security",
      count: jobs.filter((job) => job.department === "Security").length,
    },
    {
      id: "Management",
      name: "Management",
      count: jobs.filter((job) => job.department === "Management").length,
    },
    {
      id: "Sales",
      name: "Sales",
      count: jobs.filter((job) => job.department === "Sales").length,
    },
  ];

  const filteredJobs =
    selectedDepartment === "all"
      ? jobs
      : jobs.filter((job) => job.department === selectedDepartment);

  const culture = [
    {
      title: "Innovation First",
      description:
        "We encourage creative problem-solving and embrace new technologies to deliver cutting-edge solutions.",
      image:
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      title: "Collaborative Environment",
      description:
        "Work with talented professionals in a supportive environment that values teamwork and knowledge sharing.",
      image:
        "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      title: "Continuous Learning",
      description:
        "Grow your skills with access to training, conferences, certifications, and mentorship programs.",
      image:
        "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Users className="h-4 w-4 mr-2" />
              Join Our Team
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Build Your Career in Quality Assurance
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Join a team of passionate QA professionals dedicated to delivering
              exceptional software quality. Grow your career while making a real
              impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() =>
                  document
                    .getElementById("open-positions")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-teal-600 text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-teal-700 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span>View Open Positions</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <Link
                to="/contact"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-md font-semibold text-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Contact HR
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Work at InspecQ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer competitive benefits and a culture that supports your
              professional and personal growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 group"
              >
                <div className="bg-teal-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Culture
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience a workplace culture that values innovation,
              collaboration, and continuous growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {culture.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                ></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Open Positions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find your next opportunity and join our growing team of QA
              professionals.
            </p>
          </div>

          {/* Department Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setSelectedDepartment(dept.id)}
                className={`px-6 py-3 rounded-full font-medium transition-colors duration-200 ${
                  selectedDepartment === dept.id
                    ? "bg-teal-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {dept.name} ({dept.count})
              </button>
            ))}
          </div>

          {/* Job Listings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-gray-50 rounded-xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {job.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {job.type}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {job.salary}
                      </div>
                    </div>
                  </div>
                  <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">
                    {job.department}
                  </span>
                </div>

                <p className="text-gray-600 mb-6">{job.description}</p>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Requirements:
                  </h4>
                  <ul className="space-y-2">
                    {job.requirements.map((req, reqIndex) => (
                      <li
                        key={reqIndex}
                        className="flex items-center text-gray-700 text-sm"
                      >
                        <CheckCircle className="h-4 w-4 text-teal-600 mr-3" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Posted {job.posted}
                  </span>
                  <button className="bg-teal-600 text-white px-6 py-2 rounded-md font-medium hover:bg-teal-700 transition-colors duration-200">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">
                No positions available in this department at the moment.
              </p>
              <p className="text-gray-600 mt-2">
                Check back soon or contact us about future opportunities.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Application Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined hiring process is designed to find the best fit
              for both you and our team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Apply Online
              </h3>
              <p className="text-gray-600">
                Submit your application and resume through our online portal.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Initial Screening
              </h3>
              <p className="text-gray-600">
                Phone or video call to discuss your background and interests.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Technical Interview
              </h3>
              <p className="text-gray-600">
                Technical assessment and discussion with team members.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Final Interview
              </h3>
              <p className="text-gray-600">
                Meet with leadership team and discuss role expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Join Our Team?
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Take the next step in your QA career and help us deliver exceptional
            software quality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() =>
                document
                  .getElementById("open-positions")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-white text-teal-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Browse Open Positions
            </button>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-teal-600 transition-colors duration-200"
            >
              Contact HR Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
