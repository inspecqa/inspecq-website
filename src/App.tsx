import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Solutions from "./pages/Solutions";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FunctionalTesting from "./pages/services/FunctionalTesting";
import TestAutomation from "./pages/services/TestAutomation";
import PerformanceTesting from "./pages/services/PerformanceTesting";
import MobileTesting from "./pages/services/MobileTesting";
// import SecurityTesting from "./pages/services/SecurityTesting";
import ApiTesting from "./pages/services/ApiTesting";
// import Demo from "./pages/Demo";
import FreeTrial from "./pages/FreeTrial";
import CaseStudies from "./pages/CaseStudies";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import Resources from "./pages/Resources";
import Pricing from "./pages/Pricing";
import QAConsultingAudits from "./pages/services/QAConsultingAudits";
import { BestPracticesPage } from "./pages/BestPracticesPage";
import { BestPracticeDetailPage } from "./pages/BestPracticeDetailPage";
import BackToTop from "./components/BackToTop";
import FreeTrialTerms from "./pages/legal/FreeTrialTerms";
import TermsAndCondition from "./pages/legal/TermsAndCondition";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import NotFound404 from "./pages/errors/NotFound404";
import ServerError500 from "./pages/errors/ServerError500";
import Maintenance from "./pages/errors/Maintenance";

import { SITE_CONFIG } from "./config/siteConfig";

// Admin imports
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminCareers from "./pages/admin/Careers";
import AdminNewsletter from "./pages/admin/Newsletter";
import AdminForms from "./pages/admin/Forms";
import ProtectedRoute from "./components/admin/ProtectedRoute";

function BestPracticeDetailWrapper() {
  const { slug } = useParams<{ slug: string }>();
  return <BestPracticeDetailPage slug={slug!} onNavigate={() => {}} />;
}

function BestPracticesWrapper() {
  const navigate = useNavigate();
  const onNavigate = (page: string, slug?: string) => {
    if (slug) {
      navigate(`${page}/${slug}`);
    } else {
      navigate(page);
    }
  };
  return <BestPracticesPage onNavigate={onNavigate} />;
}

function App() {
  // Full-site maintenance mode
  if (SITE_CONFIG.MAINTENANCE_MODE) {
    return <Maintenance />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Services */}
          <Route path="/services" element={<Services />} />
          <Route
            path="/services/functional-testing"
            element={<FunctionalTesting />}
          />
          <Route
            path="/services/test-automation"
            element={<TestAutomation />}
          />
          <Route
            path="/services/performance-testing"
            element={<PerformanceTesting />}
          />
          <Route path="/services/mobile-testing" element={<MobileTesting />} />
          {/* <Route
            path="/services/security-testing"
            element={<SecurityTesting />}
          /> */}
          <Route path="/services/api-testing" element={<ApiTesting />} />
          <Route
            path="/services/qa-consulting-audits"
            element={<QAConsultingAudits />}
          />

          {/* Other main pages */}
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/demo" element={<Demo />} /> */}
          <Route path="/free-trial" element={<FreeTrial />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/pricing" element={<Pricing />} />

          {/* Best Practices */}
          <Route path="/best-practices" element={<BestPracticesWrapper />} />
          <Route
            path="/best-practices/:slug"
            element={<BestPracticeDetailWrapper />}
          />

          {/* Legal */}
          <Route path="/legal/free-trial-terms" element={<FreeTrialTerms />} />
          <Route
            path="/legal/terms-and-service"
            element={<TermsAndCondition />}
          />
          <Route path="/legal/privacy-policy" element={<PrivacyPolicy />} />

          {/* Error routes for testing / manual redirects */}
          <Route path="/500" element={<ServerError500 />} />
          <Route path="/maintenance" element={<Maintenance />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/careers"
            element={
              <ProtectedRoute>
                <AdminCareers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/newsletter"
            element={
              <ProtectedRoute>
                <AdminNewsletter />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/forms"
            element={
              <ProtectedRoute>
                <AdminForms />
              </ProtectedRoute>
            }
          />

          {/* Catch-all 404 (keeps working even after admin routes in v6) */}
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;