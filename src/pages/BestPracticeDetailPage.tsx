import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { bestPractices } from "../data/best-practices";
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  BookOpen,
  Share2,
  Bookmark,
  Download,
  Settings,
  Zap,
  FileText,
  GitBranch,
  Gauge,
  Smartphone,
  Twitter,
  Linkedin,
  Link2,
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
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
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
const Separator = ({ className }: { className?: string }) => (
  <hr className={cn("border-t border-slate-200", className)} />
);
/** -------------------------------------------------------------------- */

interface BestPracticeDetailPageProps {
  slug: string;
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

export function BestPracticeDetailPage({
  slug,
  onNavigate,
}: BestPracticeDetailPageProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);

  const practice = bestPractices.find((p) => p.slug === slug);

  if (!practice) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl text-slate-800 mb-4">Practice Not Found</h1>
          <p className="text-slate-600 mb-8">
            The best practice you're looking for doesn't exist.
          </p>
          <Button onClick={() => onNavigate("best-practices")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Best Practices
          </Button>
        </div>
      </div>
    );
  }

  const Icon = iconMap[practice.icon] || Settings;

  // const getDifficultyColor = (difficulty: string) => {
  //   switch (difficulty) {
  //     case "Beginner":
  //       return "bg-green-100 text-green-700 border-green-200";
  //     case "Intermediate":
  //       return "bg-blue-100 text-blue-700 border-blue-200";
  //     case "Advanced":
  //       return "bg-purple-100 text-purple-700 border-purple-200";
  //     default:
  //       return "bg-gray-100 text-gray-700 border-gray-200";
  //   }
  // };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = practice.title;

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            text
          )}&url=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
        break;
    }
    setShareMenuOpen(false);
  };

  const relatedPractices = bestPractices
    .filter((p) => p.category === practice.category && p.id !== practice.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-teal-600 to-teal-700 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            onClick={() => onNavigate("best-practices")}
            className="text-white hover:bg-white/10 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Best Practices
          </Button>

          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge
                variant="outline"
                className="border-white/30 text-white bg-white/10"
              >
                {practice.category}
              </Badge>
              <Badge
                variant="outline"
                className="border-white/30 text-white bg-white/10"
              >
                {practice.difficulty}
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl mb-4">{practice.title}</h1>
            <p className="text-xl text-teal-50 mb-6">{practice.excerpt}</p>

            <div className="flex flex-wrap items-center gap-6 text-teal-50">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{practice.readTime} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>{practice.checklist.length} steps</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                <span>
                  {practice.tags.length}{" "}
                  {practice.tags.length === 1 ? "topic" : "topics"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Actions */}
              <div className="flex items-center gap-3 mb-8">
                <Button
                  variant="outline"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={isBookmarked ? "bg-teal-50 border-teal-600" : ""}
                >
                  <Bookmark
                    className={cn(
                      "h-4 w-4 mr-2",
                      isBookmarked && "fill-current text-teal-600"
                    )}
                  />
                  {isBookmarked ? "Bookmarked" : "Bookmark"}
                </Button>
                <div className="relative">
                  <Button
                    variant="outline"
                    onClick={() => setShareMenuOpen(!shareMenuOpen)}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  {shareMenuOpen && (
                    <Card className="absolute top-full mt-2 z-10 shadow-lg">
                      <CardContent className="p-2 min-w-[150px]">
                        <button
                          onClick={() => handleShare("twitter")}
                          className="flex items-center gap-2 w-full px-3 py-2 hover:bg-slate-100 rounded"
                        >
                          <Twitter className="h-4 w-4" />
                          Twitter
                        </button>
                        <button
                          onClick={() => handleShare("linkedin")}
                          className="flex items-center gap-2 w-full px-3 py-2 hover:bg-slate-100 rounded"
                        >
                          <Linkedin className="h-4 w-4" />
                          LinkedIn
                        </button>
                        <button
                          onClick={() => handleShare("copy")}
                          className="flex items-center gap-2 w-full px-3 py-2 hover:bg-slate-100 rounded"
                        >
                          <Link2 className="h-4 w-4" />
                          Copy Link
                        </button>
                      </CardContent>
                    </Card>
                  )}
                </div>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
              </div>

              {/* Article */}
              <Card className="mb-8">
                <CardContent className="p-8 prose prose-slate max-w-none">
                  <ReactMarkdown
                    components={{
                      h1: ({ children }) => (
                        <h1 className="text-3xl text-slate-900 mt-8 mb-4">
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-2xl text-slate-900 mt-6 mb-3">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-xl text-slate-900 mt-4 mb-2">
                          {children}
                        </h3>
                      ),
                      p: ({ children }) => (
                        <p className="text-slate-700 mb-4 leading-relaxed">
                          {children}
                        </p>
                      ),
                      ul: ({ children }) => (
                        <ul className="list-disc pl-6 mb-4 text-slate-700">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal pl-6 mb-4 text-slate-700">
                          {children}
                        </ol>
                      ),
                      li: ({ children }) => (
                        <li className="mb-2">{children}</li>
                      ),
                      code: ({ className, children }) => {
                        const isInline = !className;
                        return isInline ? (
                          <code className="bg-slate-100 text-teal-600 px-1.5 py-0.5 rounded text-sm">
                            {children}
                          </code>
                        ) : (
                          <code className="block bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto mb-4">
                            {children}
                          </code>
                        );
                      },
                      pre: ({ children }) => (
                        <pre className="mb-4">{children}</pre>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-teal-600 pl-4 italic text-slate-600 my-4">
                          {children}
                        </blockquote>
                      ),
                      table: ({ children }) => (
                        <div className="overflow-x-auto mb-4">
                          <table className="min-w-full divide-y divide-slate-200">
                            {children}
                          </table>
                        </div>
                      ),
                      th: ({ children }) => (
                        <th className="px-4 py-2 bg-slate-100 text-left text-slate-900">
                          {children}
                        </th>
                      ),
                      td: ({ children }) => (
                        <td className="px-4 py-2 border-t border-slate-200 text-slate-700">
                          {children}
                        </td>
                      ),
                    }}
                  >
                    {practice.content}
                  </ReactMarkdown>
                </CardContent>
              </Card>

              {/* Tags */}
              <div className="mb-8">
                <h3 className="text-lg text-slate-900 mb-3">Topics Covered</h3>
                <div className="flex flex-wrap gap-2">
                  {practice.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="bg-teal-50 text-teal-700 border-teal-200"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="mb-6 sticky top-24">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-teal-100 rounded-lg">
                      <Icon className="h-5 w-5 text-teal-600" />
                    </div>
                    <h3 className="text-lg text-slate-900">
                      Implementation Checklist
                    </h3>
                  </div>
                  <Separator className="mb-4" />
                  <ul className="space-y-3">
                    {practice.checklist.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Separator className="my-4" />
                  <Button
                    onClick={() => onNavigate("contact")}
                    className="w-full bg-teal-600 hover:bg-teal-700"
                  >
                    Get Expert Help
                  </Button>
                </CardContent>
              </Card>

              {practice.resources.length > 0 && (
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <h3 className="text-lg text-slate-900 mb-4">
                      Additional Resources
                    </h3>
                    <ul className="space-y-3">
                      {practice.resources.map(
                        (resource: any, index: number) => (
                          <li key={index}>
                            <a
                              href={resource.url}
                              className="flex items-center gap-2 text-teal-600 hover:text-teal-700"
                            >
                              <BookOpen className="h-4 w-4" />
                              <span className="text-sm">{resource.title}</span>
                            </a>
                          </li>
                        )
                      )}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {relatedPractices.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg text-slate-900 mb-4">
                      Related Practices
                    </h3>
                    <div className="space-y-4">
                      {relatedPractices.map((related: any) => {
                        const RelatedIcon = iconMap[related.icon] || Settings;
                        return (
                          <button
                            key={related.id}
                            onClick={() =>
                              onNavigate("best-practice", related.slug)
                            }
                            className="w-full text-left p-3 hover:bg-slate-50 rounded-lg transition-colors"
                          >
                            <div className="flex items-start gap-3">
                              <div className="p-2 bg-teal-100 rounded flex-shrink-0">
                                <RelatedIcon className="h-4 w-4 text-teal-600" />
                              </div>
                              <div>
                                <h4 className="text-sm text-slate-900 mb-1">
                                  {related.title}
                                </h4>
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                  <Clock className="h-3 w-3" />
                                  <span>{related.readTime} min</span>
                                </div>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-100 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl text-slate-900 mb-4">
            Ready to Implement These Best Practices?
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Our team of QA experts can help you implement and customize these
            practices for your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => onNavigate("trial")}
              className="bg-teal-600 hover:bg-teal-700"
            >
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate("contact")}
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}