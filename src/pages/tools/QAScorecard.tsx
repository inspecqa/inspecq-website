import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import { supabase } from "../../lib/supabaseClient";
import {
  questions,
  categories,
  recommendations,
  ScoreBand,
} from "../../data/scorecard";

type View = "intro" | "quiz" | "results";

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

const QAScorecard: React.FC = () => {
  const [view, setView] = useState<View>("intro");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(20).fill(null)
  );

  const [fadeState, setFadeState] = useState<"in" | "out">("in");
  const [resultsSent, setResultsSent] = useState(false);

  // Intro Submisssion
  const handleStart = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!email.trim() || !emailOk(email)) {
      setEmailError("Please enter a valid email.");
      return;
    }
    setEmailError("");
    setFadeState("out");
    setTimeout(() => {
      setView("quiz");
      setFadeState("in");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);
  };

  // Next Question / Finish calculation
  const handleNext = () => {
    if (answers[current] === null) return;
    setFadeState("out");
    setTimeout(() => {
      if (current < questions.length - 1) {
        setCurrent((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setView("results");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setFadeState("in");
    }, 300);
  };

  const handleBack = () => {
    if (current > 0) {
      setFadeState("out");
      setTimeout(() => {
        setCurrent((prev) => prev - 1);
        setFadeState("in");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 300);
    }
  };

  // -------------------------------------------------------------
  // Data for View 3
  // -------------------------------------------------------------
  const totalPoints = answers.reduce((sum, val) => (sum || 0) + (val || 0), 0) || 0;
  const overallScore = Math.round((totalPoints / (questions.length * 3)) * 100);

  let band: ScoreBand = "At risk";
  let bandColorClass = "text-red-400";
  if (overallScore >= 80) {
    band = "Strong";
    bandColorClass = "text-green-400";
  } else if (overallScore >= 60) {
    band = "Developing";
    bandColorClass = "text-teal-400";
  } else if (overallScore >= 40) {
    band = "Needs work";
    bandColorClass = "text-amber-400";
  }

  const categoryMetrics = categories.map((cat) => {
    const catQuestions = questions
      .map((q, idx) => ({ q, idx }))
      .filter((x) => x.q.cat === cat);
    const count = catQuestions.length;
    const catScore = catQuestions.reduce(
      (sum, x) => sum + (answers[x.idx] || 0),
      0
    );
    const percentage = Math.round((catScore / (count * 3)) * 100) || 0;
    return { name: cat, percentage, count, score: catScore };
  });

  const lowestCategories = [...categoryMetrics]
    .sort((a, b) => a.percentage - b.percentage)
    .slice(0, 3);

  useEffect(() => {
    if (view === "results" && !resultsSent) {
      const pushResults = async () => {
        try {
          const categoryScoresObj = categoryMetrics.reduce((acc, cat) => {
            acc[cat.name] = cat.percentage;
            return acc;
          }, {} as Record<string, number>);

          await supabase?.from("scorecard_leads").insert({
            email,
            score: overallScore,
            band,
            category_scores: categoryScoresObj,
            answers,
            created_at: new Date().toISOString(),
          });
        } catch (e) {
          console.error("Scorecard lead insert failed:", e);
        }
      };

      pushResults();
      setResultsSent(true);
    }
  }, [view, resultsSent, email, overallScore, band, categoryMetrics, answers]);

  // -------------------------------------------------------------
  // Render
  // -------------------------------------------------------------
  return (
    <>
      <SEO
        title="QA Maturity Scorecard"
        description="Answer 20 questions in 5 minutes and get a personalized QA health score with actionable recommendations."
        canonical="/tools/qa-scorecard"
      />

      <div className="min-h-[80vh] bg-[#0F1A24] text-slate-200 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center font-onest relative overflow-hidden">
        <div className="max-w-3xl w-full mx-auto relative z-10">
          {view === "intro" && (
            <div
              className={`transition-all duration-300 transform ${
                fadeState === "in" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="text-center space-y-6 sm:space-y-8 mt-10">
                <p className="text-teal-400 font-semibold tracking-wider uppercase text-sm">
                  Free Assessment
                </p>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
                  How mature is your QA process?
                </h1>
                <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                  Answer 20 questions in 5 minutes and get a personalized QA
                  health score with actionable recommendations.
                </p>

                <form
                  onSubmit={handleStart}
                  className="max-w-md mx-auto mt-12 space-y-4 bg-slate-800/60 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-slate-700/50 shadow-xl"
                  noValidate
                >
                  <div className="text-left">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-300 mb-2"
                    >
                      Work email <span className="text-rose-400" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="mail@company.com"
                      className={`w-full px-4 py-3 bg-slate-900 border rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors ${
                        emailError ? "border-rose-500" : "border-slate-700"
                      }`}
                    />
                    {emailError && (
                      <p className="mt-2 text-sm text-rose-400">{emailError}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-teal-600 hover:bg-teal-500 text-white font-medium py-3.5 px-6 rounded-xl transition-colors mt-6 shadow-lg shadow-teal-900/20"
                  >
                    Start the Scorecard
                  </button>
                  {/* <p className="text-xs text-slate-500 text-center mt-5">
                    Free. No sales calls unless you want one.
                  </p> */}
                </form>
              </div>
            </div>
          )}

          {view === "quiz" && (
            <div
              className={`transition-all duration-300 transform ${
                fadeState === "in" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {/* Progress */}
              <div className="mb-8 sm:mb-12">
                <div className="flex justify-between items-end mb-3 text-sm">
                  <span className="font-semibold text-teal-400 uppercase tracking-widest text-xs sm:text-sm">
                    {questions[current].cat}
                  </span>
                  <span className="text-slate-400 font-medium">
                    {current + 1} of {questions.length}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal-600 rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${((current + 1) / questions.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Question */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 sm:mb-10 leading-snug">
                {questions[current].text}
              </h2>

              {/* Options */}
              <div className="space-y-4 mb-10 sm:mb-12">
                {questions[current].opts.map(([label, val], idx) => {
                  const isSelected = answers[current] === val;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        const nextAnswers = [...answers];
                        nextAnswers[current] = val;
                        setAnswers(nextAnswers);
                      }}
                      className={`w-full text-left p-5 sm:p-6 rounded-2xl transition-all duration-200 border-2 shadow-sm ${
                        isSelected
                          ? "border-teal-500 bg-teal-900/20 shadow-teal-900/10"
                          : "border-slate-700 bg-slate-800/80 hover:border-slate-500 hover:bg-slate-800"
                      }`}
                    >
                      <span className="text-slate-200 sm:text-lg block font-medium leading-relaxed">
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center border-t border-slate-800 pt-8 mt-auto">
                <button
                  onClick={handleBack}
                  disabled={current === 0}
                  className="px-6 py-3 text-slate-400 hover:text-white transition-colors disabled:opacity-0 disabled:pointer-events-none font-medium rounded-lg hover:bg-slate-800"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={answers[current] === null}
                  className="bg-teal-600 hover:bg-teal-500 disabled:opacity-50 disabled:hover:bg-teal-600 text-white px-8 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-teal-900/20 font-semibold ml-auto"
                >
                  {current === questions.length - 1
                    ? "See my results"
                    : "Next question"}
                </button>
              </div>
            </div>
          )}

          {view === "results" && (
            <div
              className={`transition-all duration-300 transform ${
                fadeState === "in" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                  Your QA Health Score
                </h1>
                <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                  Based on your answers, here is a detailed breakdown of your
                  quality engineering maturity.
                </p>
                <div className="mt-14 mb-16">
                  <div className="inline-flex flex-col items-center justify-center w-56 h-56 sm:w-64 sm:h-64 bg-slate-800/80 border-2 border-slate-700/50 rounded-full shadow-2xl relative">
                    <span className="text-7xl sm:text-8xl font-black text-white mb-1 leading-none tracking-tighter">
                      {overallScore}
                    </span>
                    <span className="text-xl sm:text-2xl text-slate-500 font-medium mb-3">
                      / 100
                    </span>
                    <span
                      className={`text-lg sm:text-xl font-bold uppercase tracking-widest ${bandColorClass}`}
                    >
                      {band}
                    </span>
                  </div>
                </div>
              </div>

              {/* Category Grid */}
              <div className="mb-20">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8">
                  Category Breakdown
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  {categoryMetrics.map((cat) => (
                    <div
                      key={cat.name}
                      className="bg-slate-800/80 border border-slate-700/80 p-6 rounded-2xl shadow-sm"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold text-slate-200 text-lg">
                          {cat.name}
                        </span>
                        <span className="text-teal-400 font-bold text-lg">
                          {cat.percentage}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden shadow-inner">
                        <div
                          className="h-full bg-teal-500 rounded-full"
                          style={{ width: `${cat.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="mb-20">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                  Top Recommendations
                </h3>
                <p className="text-slate-400 mb-8 text-lg">
                  Focusing on these areas will have the highest impact on your
                  QA maturity:
                </p>
                <div className="space-y-6">
                  {lowestCategories.map((cat) => {
                    let level: "critical" | "improvement" | "strengthen" =
                      "strengthen";
                    if (cat.percentage < 40) level = "critical";
                    else if (cat.percentage <= 65) level = "improvement";

                    const copy = recommendations[cat.name][level];
                    
                    let tagClass = "text-teal-400 bg-teal-400/10 border-teal-400/20";
                    let tagText = "Maintain";
                    let accentColor = "bg-teal-500";
                    
                    if (level === "critical") {
                      tagClass = "text-rose-400 bg-rose-400/10 border-rose-400/20";
                      tagText = "High Priority";
                      accentColor = "bg-rose-500";
                    } else if (level === "improvement") {
                      tagClass = "text-amber-400 bg-amber-400/10 border-amber-400/20";
                      tagText = "Medium Priority";
                      accentColor = "bg-amber-500";
                    }

                    return (
                      <div
                        key={cat.name}
                        className="bg-slate-800/80 border border-slate-700/80 p-6 sm:p-8 rounded-2xl flex relative overflow-hidden shadow-md"
                      >
                         <div className={`absolute top-0 left-0 w-1.5 h-full ${accentColor}`} />
                        <div className="flex-1 pl-2">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                            <h4 className="text-xl sm:text-2xl font-bold text-white">
                              {cat.name}
                            </h4>
                            <div className={`inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider border self-start sm:self-auto ${tagClass}`}>
                               {tagText}
                            </div>
                          </div>
                          <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
                            {copy}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-teal-900/60 to-slate-800 border border-teal-500/30 rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none text-teal-400">
                   <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/></svg>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">
                  Want a detailed QA improvement plan?
                </h3>
                <p className="text-slate-300 max-w-2xl mx-auto mb-10 text-lg sm:text-xl leading-relaxed relative z-10">
                  Let's discuss your current QA challenges and craft a tailored strategy to improve testing efficiency and release confidence.
                </p>
                <Link
                  to="/contact"
                  onClick={() => window.scrollTo(0,0)}
                  className="inline-block bg-teal-600 hover:bg-teal-500 text-white font-medium text-lg py-4 px-10 rounded-xl transition-all shadow-lg hover:shadow-teal-500/25 relative z-10"
                >
                  Book a free audit call
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default QAScorecard;
