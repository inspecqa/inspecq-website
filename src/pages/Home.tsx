import SEO from '../components/SEO';
import Hero from '../components/Hero';
import Services from '../components/Services';
import ToolsStack from '../components/ToolsStack';
import AboutUs from '../components/AboutUs';
// import WhyChooseUs from '../components/WhyChooseUs';
// import Portfolio from '../components/Portfolio';
// import Team from '../components/Team';
import Contact from '../components/Contact';
import Consultation from '../components/Consultation';

const Home = () => {
  return (
    <div>
      <SEO
        title="Software QA Testing Agency"
        description="InspecQ is a modern QA testing agency offering functional, automation, API, performance, mobile, and security testing to help you ship quality software faster."
        canonical="/"
      />
      <Hero />
      <Services />
      <ToolsStack />
      <AboutUs />
      {/* <Portfolio /> */}
      {/* <WhyChooseUs /> */}
      {/* <Team /> */}
      <Contact />
      <Consultation />
    </div>
  );
};

export default Home;