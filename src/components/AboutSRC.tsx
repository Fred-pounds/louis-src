import srcGroup from '@/assets/src-group.jpg';

const AboutSRC = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">About Our SRC</h2>
        <div className="section-divider" />

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div>
            <p className="text-foreground/80 leading-relaxed mb-4">
              The Student Representative Council (SRC) of St. Louis Senior High School, an all-girls 
              Catholic institution, serves as the voice of our vibrant student body, promoting 
              leadership, truth, and progress among young women.
            </p>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Our SRC works to enhance student life through initiatives, programs, and events 
              that empower every young woman. We bridge the gap between students and administration, 
              ensuring every voice is heard and every dream is nurtured.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              Since its establishment, the SRC has championed student welfare, organized 
              memorable events, and fostered a culture of excellence, sisterhood, and unity 
              within our school community.
            </p>
          </div>
          <div className="relative">
            <img
              src={srcGroup}
              alt="SRC Group Photo"
              className="rounded-lg shadow-lg w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSRC;
