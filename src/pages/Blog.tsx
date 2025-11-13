import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  User,
  ArrowRight,
  Search,
  CheckCircle,
  Tag as TagIcon,
} from "lucide-react";

// --- helpers ---
const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

type Post = {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  tags: string[];
  path?: string;
};

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // --- security post removed; added 2 helpful articles ---
  const blogPosts: Post[] = [
    {
      id: 1,
      title: "The Future of Test Automation: AI and Machine Learning",
      excerpt:
        "How AI/ML is reshaping automation strategy, tooling, and test stability.",
      author: "Sarah Chen",
      date: "2025-01-15",
      category: "Automation",
      readTime: "8 min read",
      image:
        "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["AI", "Machine Learning", "Test Automation", "Future Tech"],
    },
    {
      id: 2,
      title: "Mobile Testing Best Practices for 2025",
      excerpt:
        "A concise checklist for iOS, Android, and hybrid apps that ship clean.",
      author: "Michael Rodriguez",
      date: "2025-01-12",
      category: "Mobile Testing",
      readTime: "6 min read",
      image:
        "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Mobile Testing", "iOS", "Android", "Best Practices"],
    },
    {
      id: 3,
      title: "Performance Testing at Scale: Lessons from Enterprise Projects",
      excerpt:
        "Throughput, P95, bottlenecks — what actually matters when traffic spikes.",
      author: "David Park",
      date: "2025-01-08",
      category: "Performance",
      readTime: "12 min read",
      image:
        "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Performance Testing", "Scalability", "Load Testing"],
    },
    {
      id: 4,
      title: "API Testing Fundamentals: A Complete Guide",
      excerpt:
        "Contracts, data, and CI/CD hardening for reliable API pipelines.",
      author: "Lisa Wang",
      date: "2025-01-05",
      category: "API Testing",
      readTime: "9 min read",
      image:
        "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["API Testing", "REST", "GraphQL", "Automation"],
    },
    {
      id: 5,
      title: "Building a Quality Culture: Beyond Testing",
      excerpt: "Make quality a team habit — not just a QA function.",
      author: "James Thompson",
      date: "2025-01-03",
      category: "Quality Culture",
      readTime: "7 min read",
      image:
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Quality Culture", "Leadership", "Process Improvement"],
    },
    // NEW helpful, non-security posts:
    {
      id: 6,
      title: "Release Readiness Checklist for SaaS (2025)",
      excerpt:
        "A one-page pre-release gate: coverage, risks, rollback, and observability.",
      author: "InspecQ Team",
      date: "2025-01-02",
      category: "Quality",
      readTime: "5 min read",
      image:
        "https://images.pexels.com/photos/669619/pexels-photo-669619.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Release", "Checklist", "SaaS"],
    },
    {
      id: 7,
      title: "Fixing Flaky Tests: A Practical Playbook",
      excerpt:
        "Most flakes are self-inflicted. Here’s how to find and eliminate them fast.",
      author: "InspecQ Team",
      date: "2025-01-01",
      category: "Automation",
      readTime: "7 min read",
      image:
        "https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Flaky Tests", "Stability", "CI/CD"],
    },
  ].map((p) => ({ ...p, path: `/blog/${slugify(p.title)}` }));

  const featuredPost = blogPosts[0];
  const recentPosts = blogPosts.slice(1);

  // categories with auto counts (from recent posts)
  const categories = useMemo(() => {
    const counts = recentPosts.reduce<Record<string, number>>((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {});
    const list = Object.keys(counts).map((k) => ({
      id: k,
      name: k,
      count: counts[k],
    }));
    list.sort((a, b) => a.name.localeCompare(b.name));
    return [
      { id: "all", name: "All Posts", count: recentPosts.length },
      ...list,
    ];
  }, [recentPosts]);

  const filteredPosts = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return recentPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "all" || post.category === selectedCategory;
      const matchesSearch =
        !term ||
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term) ||
        post.tags.some((t) => t.toLowerCase().includes(term));
      return matchesCategory && matchesSearch;
    });
  }, [recentPosts, selectedCategory, searchTerm]);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const addTagToSearch = (tag: string) => {
    setSearchTerm(tag);
    const el = document.getElementById("posts-grid");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <CheckCircle className="h-4 w-4 mr-2" />
              QA Insights & Best Practices
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              InspecQ Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Short, practical posts that help you ship quality with confidence.
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                aria-label="Search blog articles"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Article
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Link
              to={featuredPost.path!}
              className="h-64 lg:h-80 bg-cover bg-center rounded-xl block group"
              style={{ backgroundImage: `url(${featuredPost.image})` }}
              aria-label={`Open featured article: ${featuredPost.title}`}
            >
              <div className="h-full bg-black/40 flex items-end p-6 rounded-xl">
                <span className="text-sm font-medium bg-teal-600 text-white px-3 py-1 rounded-full">
                  {featuredPost.category}
                </span>
              </div>
            </Link>

            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {featuredPost.title}
              </h3>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                {featuredPost.excerpt}
              </p>

              <div className="flex items-center flex-wrap gap-4 text-sm text-gray-500 mb-6">
                <span className="inline-flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  {featuredPost.author}
                </span>
                <span className="inline-flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatDate(featuredPost.date)}
                </span>
                <span>{featuredPost.readTime}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {featuredPost.tags.map((tag, index) => (
                  <button
                    key={index}
                    onClick={() => addTagToSearch(tag)}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <Link
                to={featuredPost.path!}
                className="bg-teal-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-teal-700 transition-colors duration-200 inline-flex items-center"
              >
                <span>Read Full Article</span>
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-colors duration-200 ${
                  selectedCategory === category.id
                    ? "bg-teal-600 text-white shadow-sm"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                aria-pressed={selectedCategory === category.id}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Recent Articles
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover practical insights and battle-tested practices.
            </p>
          </div>

          <div
            id="posts-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-gray-50 rounded-xl overflow-hidden hover:bg-white hover:shadow-lg transition-all duration-300 group"
              >
                <Link
                  to={post.path!}
                  className="block h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${post.image})` }}
                  aria-label={`Open article: ${post.title}`}
                >
                  <div className="h-full bg-black/40 flex items-end p-4">
                    <span className="text-sm font-medium bg-teal-600 text-white px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </Link>

                <div className="p-6">
                  <Link to={post.path!}>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors duration-200">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center flex-wrap gap-3 text-xs text-gray-500 mb-4">
                    <span className="inline-flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {post.author}
                    </span>
                    <span className="inline-flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(post.date)}
                    </span>
                    <span>{post.readTime}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 2).map((tag, index) => (
                      <button
                        key={index}
                        onClick={() => addTagToSearch(tag)}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs hover:bg-gray-200 transition inline-flex items-center gap-1"
                      >
                        <TagIcon className="w-3 h-3" />
                        {tag}
                      </button>
                    ))}
                    {post.tags.length > 2 && (
                      <span className="text-gray-500 text-xs">
                        +{post.tags.length - 2} more
                      </span>
                    )}
                  </div>

                  <Link
                    to={post.path!}
                    className="text-teal-600 hover:text-teal-700 font-medium text-sm inline-flex items-center transition-colors duration-200"
                  >
                    Read More <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">
                No articles found matching your criteria.
              </p>
              <p className="text-gray-600 mt-2">
                Try adjusting your search or category filter.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchTerm("");
                  }}
                  className="px-5 py-2 rounded-md bg-teal-600 text-white hover:bg-teal-700 transition"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter & CTA */}
      <section className="py-20 bg-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated with QA Insights
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Subscribe for monthly testing tips and practical playbooks.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-600"
              aria-label="Email address"
            />
            <button
              className="bg-white text-teal-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors duration-200"
              onClick={() => alert("Subscribed! ✅")}
            >
              Subscribe
            </button>
          </div>
          <p className="text-teal-100 text-sm mt-4">
            No spam. Unsubscribe anytime.
          </p>

          <div className="mt-10">
            <Link
              to="/contact?source=blog"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/10 text-white font-medium ring-1 ring-white/30 hover:bg-white/20 transition"
            >
              Book a Free QA Call
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
