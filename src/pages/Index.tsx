import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutSRC from '@/components/AboutSRC';
import ProgramOutline from '@/components/ProgramOutline';
import DailyRecap from '@/components/DailyRecap';
import Executives from '@/components/Executives';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <AboutSRC />
      <ProgramOutline />
      <DailyRecap />
      <Executives />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
