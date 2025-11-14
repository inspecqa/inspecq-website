import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { bestPractices, practiceCategories } from "../data/best-practices.ts";
import consultationIllustration from "../../assets/consultation-illustration.svg";
import consultationBg from "../assets/consultation-bg.svg";
import {
  Search as SearchIcon,
  Clock,
  ArrowRight,
  CheckCircle,
  Settings,
  Zap,
  FileText,
  GitBranch,
  Gauge,
  Smartphone,
} from "lucide-react";

/** ---- Minimal in-file UI primitives (no external ./ui/* imports) ---- */
const cn = (...c: Array<string | false | undefined>) =>
  c.filter(Boolean).join(" ");

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "md" | "lg";
  type?: "button" | "submit" | "reset";
};
const Button = ({
  children,
  onClick,
  className,
  variant = "default",
  size = "md",
  type = "button",
}: ButtonProps) => {
  const base =
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors";
  const sizes = size === "lg" ? "px-5 py-3 text-base" : "px-4 py-2 text-sm";
  const variants = {
    default: "bg-teal-600 text-white hover:bg-teal-700",
    outline:
      "border border-slate-300 text-slate-800 bg-white hover:bg-slate-50",
    ghost: "text-slate-800 hover:bg-slate-100",
  }[variant];
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(base, sizes, variants, className)}
    >
      {children}
    </button>
  );
};

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline";
};
const Badge = ({ children, className, variant = "default" }: BadgeProps) => {
  const base = "inline-flex items-center rounded-full px-3 py-1 text-xs";
  const variants =
    variant === "outline"
      ? "border border-slate-300 text-slate-700 bg-white"
      : "bg-slate-800 text-white";
  return <span className={cn(base, variants, className)}>{children}</span>;
};

const Card = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    role={onClick ? "button" : undefined}
    className={cn(
      "bg-white border border-slate-200 rounded-2xl shadow-sm",
      className
    )}
  >
    {children}
  </div>
);
const CardContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={cn("p-6", className)}>{children}</div>;

const Input = ({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className={cn(
      "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-teal-500",
      className
    )}
  />
);
/** -------------------------------------------------------------------- */

interface BestPracticesPageProps {
  onNavigate: (page: string, slug?: string) => void;
}

const iconMap: Record<string, any> = {
  Settings,
  Zap,
  FileText,
  GitBranch,
  Gauge,
  Smartphone,
};

export function BestPracticesPage({ onNavigate }: BestPracticesPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Practices");
  // const [selectedDifficulty, setSelectedDifficulty] = useState("All Levels");

  // const difficulties = ["All Levels", "Beginner", "Intermediate", "Advanced"];

  const filteredPractices = useMemo(() => {
    return bestPractices.filter((practice) => {
      const matchesCategory =
        selectedCategory === "All Practices" ||
        practice.category === selectedCategory;
      // const matchesDifficulty =
      //   selectedDifficulty === "All Levels" ||
      //   practice.difficulty === selectedDifficulty;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === "" ||
        practice.title.toLowerCase().includes(q) ||
        practice.excerpt.toLowerCase().includes(q) ||
        practice.tags.some((tag) => tag.toLowerCase().includes(q));
      // return matchesCategory && matchesDifficulty && matchesSearch;
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory /*, selectedDifficulty*/]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-700 border-green-200";
      case "Intermediate":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Advanced":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const BackgroundImage = ({
    src,
    overlay = "bg-white/40",
  }: {
    src: string;
    overlay?: string;
  }) => (
    <div className="absolute inset-0 z-0">
      <img src={src} alt="" className="w-full h-full object-cover opacity-90" />
      <div className={`absolute inset-0 ${overlay} backdrop-blur-sm`} />
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-28 md:py-36 overflow-visible">
        <BackgroundImage src="/src/assets/service/service-hero-bg.svg" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 mt-16">
            <div className="inline-flex items-center gap-2 bg-teal-100 px-4 py-2 rounded-full mb-6">
              <CheckCircle className="h-5 w-5" />
              <span>Expert-Curated QA Best Practices</span>
            </div>
            <h1 className="text-teal-900 mb-6">QA Best Practices Library</h1>
            <p className="body-regular text-black-700 max-w-3xl mx-auto mb-8">
              Comprehensive guides and proven strategies to elevate your testing
              practices and deliver exceptional software quality.
            </p>
            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search best practices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-white text-slate-900 border-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-slate-2 00 bg-white sticky top-16 z-40">
        <div className="relative max-w-4xl mx-auto">
          <div className="py-6 text-center">
            {/* Categories */}
            <div className="mb-6">
              <p className="text-sm text-slate-600 mb-3">Categories</p>

              <div className="-mx-4 md:mx-0">
                <div
                  className="
            flex gap-3 pb-2 px-4
            overflow-x-auto md:overflow-visible
            justify-start md:justify-center
            snap-x md:snap-none
          "
                >
                  {practiceCategories.map((category) => (
                    <Button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      variant={
                        selectedCategory === category ? "default" : "outline"
                      }
                      className={cn(
                        selectedCategory === category
                          ? "bg-teal-600 hover:bg-teal-700 text-white"
                          : "",
                        "whitespace-nowrap shrink-0 snap-start"
                      )}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Difficulty Levels */}
            {/* <div>
              <p className="text-sm text-slate-600 mb-3">Difficulty Level</p>

              <div className="-mx-4 md:mx-0">
                <div
                  className="
            flex gap-3 pb-2 px-4
            overflow-x-auto md:overflow-visible
            justify-start md:justify-center
            snap-x md:snap-none
          "
                >
                  {difficulties.map((difficulty) => (
                    <Button
                      key={difficulty}
                      onClick={() => setSelectedDifficulty(difficulty)}
                      variant={
                        selectedDifficulty === difficulty
                          ? "default"
                          : "outline"
                      }
                      className={cn(
                        selectedDifficulty === difficulty
                          ? "bg-teal-600 hover:bg-teal-700 text-white"
                          : "",
                        "whitespace-nowrap shrink-0 snap-start"
                      )}
                    >
                      {difficulty}
                    </Button>
                  ))}
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPractices.length === 0 ? (
            <div className="text-center py-20">
              <SearchIcon className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-2xl text-slate-800 mb-2">
                No practices found
              </h3>
              <p className="text-slate-600">
                Try adjusting your filters or search query
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8" />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPractices.map((practice: any) => {
                  const Icon = iconMap[practice.icon] || Settings;

                  return (
                    <Card
                      key={practice.id}
                      className="group hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-teal-300"
                    >
                      <CardContent className="p-6 flex flex-col h-full">
                        {/* Icon & Meta */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="p-3 bg-teal-100 rounded-lg group-hover:bg-teal-600 transition-colors">
                            <Icon className="h-6 w-6 text-teal-600 group-hover:text-white transition-colors" />
                          </div>
                        </div>

                        <Badge
                          variant="outline"
                          className="mb-3 border-slate-300"
                        >
                          {practice.category}
                        </Badge>

                        <h3 className="text-xl text-slate-900 mb-3 group-hover:text-teal-600 transition-colors">
                          {practice.title}
                        </h3>

                        <p className="text-slate-600 mb-4 line-clamp-3 flex-grow">
                          {practice.excerpt}
                        </p>

                        <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{practice.readTime} min read</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CheckCircle className="h-4 w-4" />
                            <span>{practice.checklist.length} steps</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {practice.tags.slice(0, 3).map((tag: string) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                          {practice.tags.length > 3 && (
                            <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded">
                              +{practice.tags.length - 3}
                            </span>
                          )}
                        </div>

                        {/* ✅ Use Link for navigation */}
                        <Link
                          to={`/best-practices/${practice.slug}`}
                          className="flex items-center gap-2 text-teal-600 group-hover:gap-3 transition-all mt-auto"
                        >
                          <span>Read Guide</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[28px]">
            <img
              src={consultationBg}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 mix-blend-multiply" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center px-6 sm:px-10 lg:px-14 py-12 lg:py-16">
              {/* Left copy */}
              <div className="text-white">
                <h1>
                  30 Minute Free QA
                  <br /> Consultation to clear
                  <br /> your doubts.
                </h1>

                <p className="body-regular mt-6 text-white/90 text-lg max-w-2xl">
                  Book a 30-minute consultation to discuss your testing needs
                  and get expert recommendations.
                </p>

                <a
                  href="https://calendly.com/mail-inspecq/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-text mt-10 inline-flex items-center rounded-full bg-white border border-buttonBorder text-slate-900 px-6 sm:px-8 py-3 sm:py-4 text-base font-medium shadow-md hover:shadow-lg transition"
                >
                  Schedule Consultation
                </a>
              </div>

              {/* Right illustration */}
              <div className="relative">
                <img
                  src={consultationIllustration}
                  alt="Consultation illustration"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default BestPracticesPage;
