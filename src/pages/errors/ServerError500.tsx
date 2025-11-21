import { Helmet } from "react-helmet-async";
import ErrorPageShell from "../../components/layout/ErrorPageShell";
import { Bug } from "lucide-react";

const ServerError500 = () => {
  return (
    <>
      <Helmet>
        <title>500 – Internal Error | InspecQ</title>
        <meta
          name="description"
          content="An internal error occurred while trying to load the InspecQ site. Please try again or contact our team."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <ErrorPageShell
        statusCode="500"
        label="Internal Error"
        title="Looks like one of our systems is acting flaky."
        subtitle="We caught an unexpected failure."
        description="An internal error occurred while processing your request. Our team reviews these failures just like failing test cases—so this will be investigated and resolved as soon as possible."
        Icon={Bug}
        primaryCta={{
          label: "Try Again",
          onClick: () => window.location.reload(),
        }}
        secondaryCta={{
          label: "Contact InspecQ",
          to: "mailto:contact@inspecq.com",
          external: true,
        }}
      />
    </>
  );
};

export default ServerError500;