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
      className="relative min-h-[85vh] flex items-center justify-center pt-16 overflow-hidden"
    >
      {/* Background Image with Zoom Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-pulse-slow scale-105"
          style={{
            backgroundImage: `url(${heroImage})`,
            animationDuration: '20s'
          }}
        />
      </div>

      {/* Premium Overlay: Radial Gradient + Texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-primary/90 mix-blend-multiply" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-primary/20 to-primary/80" />

      {/* Content with Staggered Animation */}
      <div className="relative z-10 text-center px-4 py-20 max-w-4xl mx-auto">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out fill-mode-forwards">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-6 tracking-wide">
            ✨ ST. LOUIS SENIOR HIGH SCHOOL
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 font-serif leading-tight drop-shadow-lg">
            SRC Week <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-amber-400">2026</span>
          </h1>
        </div>

        <p className="text-xl md:text-2xl text-white/90 mb-10 tracking-wider font-light animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300 fill-mode-forwards uppercase">
          For Students • For Truth • For Progress
        </p>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 fill-mode-forwards">
          <button
            onClick={handleScroll}
            className="hero-button group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              View Program
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform group-hover:translate-y-1"><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
