import heroImage from '@/assets/hero-school.jpg';

const Hero = () => {
  const handleScroll = () => {
    const element = document.querySelector('#program');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[70vh] flex items-center justify-center pt-16"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 py-20">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-4 font-serif">
          SRC Week 2026
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-primary-foreground/90 mb-8 tracking-widest uppercase">
          For Students, For Truth, For Progress.
        </p>
        <button
          onClick={handleScroll}
          className="hero-button"
        >
          View Program
        </button>
      </div>
    </section>
  );
};

export default Hero;
