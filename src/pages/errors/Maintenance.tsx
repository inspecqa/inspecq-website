import { Helmet } from "react-helmet-async";
import ErrorPageShell from "../../components/layout/ErrorPageShell";
import { Wrench } from "lucide-react";

const Maintenance = () => {
  return (
    <>
      <Helmet>
        <title>We’re Updating InspecQ | Scheduled Maintenance</title>
        <meta
          name="description"
          content="The InspecQ site is temporarily down for scheduled maintenance while we roll out improvements and perform internal QA checks."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <ErrorPageShell
        statusCode="503"
        label="Scheduled Maintenance"
        title="We’re shipping a new build behind the scenes."
        subtitle="Short downtime. Long-term quality."
        description="The InspecQ site is temporarily unavailable while we roll out updates and run our own regression checks. Please come back shortly—your experience should be smoother and more stable once we’re done."
        Icon={Wrench}
        primaryCta={{
          label: "Back to Home",
          to: "/",
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

export default Maintenance;