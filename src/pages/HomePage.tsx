import { Hero } from '../components/home/Hero';
import { Features } from '../components/home/Features';
import { HowItWorks } from '../components/home/HowItWorks';
import { Categories } from '../components/home/Categories';
// import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { AppPreview } from '../components/home/AppPreview';
// import { OtherApps } from '../components/home/OtherApps';
import { About } from '../components/home/About';
import { Contact } from '../components/home/Contact';

export function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <Features />
      <HowItWorks />
      <Categories />
      {/* <WhyChooseUs /> */}
      <AppPreview />
      {/* <OtherApps /> */}
      <About />
      <Contact />
    </main>
  );
}
