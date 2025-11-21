import { Helmet } from "react-helmet-async";
import ErrorPageShell from "../../components/layout/ErrorPageShell";
import { AlertTriangle } from "lucide-react";

const NotFound404 = () => {
  return (
    <>
      <Helmet>
        <title>404 – Page Not Found | InspecQ</title>
        <meta
          name="description"
          content="The page you’re trying to reach is not available on InspecQ. Navigate back to our homepage or explore our QA services."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <ErrorPageShell
        statusCode="404"
        label="Page Not Found"
        title="This page didn’t pass our QA checks."
        subtitle="Looks like you hit a broken route."
        description="The URL you tried to access isn’t part of the current InspecQ site structure. It may have been moved, renamed, or never existed. Let’s get you back to a stable path."
        Icon={AlertTriangle}
        primaryCta={{
          label: "Back to Home",
          to: "/",
        }}
        secondaryCta={{
          label: "View Our Services",
          to: "/services",
        }}
      />
    </>
  );
};

export default NotFound404;