import exec1 from '@/assets/executive-1.jpg';
import exec2 from '@/assets/executive-2.jpg';
import exec3 from '@/assets/executive-3.jpg';
import exec4 from '@/assets/executive-4.jpg';
import exec5 from '@/assets/executive-5.jpg';
import exec6 from '@/assets/executive-6.jpg';

const mainExecutives = [
  { name: 'H.E. Benedicta Serwaa Opoku', position: 'SRC President', image: exec1 },
  { name: 'Hon. Erica Akosua Amponsah', position: 'Vice President', image: exec2 },
  { name: 'Hon. Nadra N.A. Acheampong', position: 'General Secretary', image: exec3 },
  { name: 'Hon. Najart Haruna', position: 'Organizing Secretary', image: exec4 },
  { name: 'Hon. Petra M.F. Boateng', position: 'Financial Secretary', image: exec5 },
  { name: 'Hon. Osaah Asamoah Gyamfi', position: 'PRO', image: exec6 },
];

const deputies = [
  { name: 'Hon. Judith Afriyie', position: 'Dep. General Secretary' },
  { name: 'Hon. Nhyira Adutwumwaa', position: 'Dep. Organizing Secretary' },
  { name: 'Hon. Angel Cherlly', position: 'Dep. Financial Secretary' },
];

const advisors = [
  { name: 'Hon. Stella Amankwah Darko', position: 'Advisor' },
  { name: 'Hon. Magaret Nyantakyi', position: 'Advisor' },
  { name: 'Hon. Nana Adwoa Nkansah', position: 'Advisor' },
  { name: 'Hon. Esther Biney', position: 'Advisor' },
  { name: 'Hon. Adelaide Asabea Darmoe', position: 'Advisor' },
  { name: 'Hon. Renee Grace A. Mawutor', position: 'Regional Trustee' },
  { name: 'Hon. Christiana Anane Danquah Senior', position: 'Regional AWACOM Gen. Sec.' },
];

const Executives = () => {
  return (
    <section id="executives" className="py-24 bg-gradient-to-b from-primary to-primary/95 text-white relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="section-heading text-white">Meet Our SRC Executives</h2>
        <div className="w-24 h-0.5 bg-white/30 mx-auto mb-12 rounded-full" />

        {/* Main Executives with Photos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto mb-16">
          {mainExecutives.map((exec, index) => (
            <div
              key={index}
              className="glass-card hover-lift group rounded-xl overflow-hidden text-center pb-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative mb-4 overflow-hidden aspect-[3/4]">
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img
                  src={exec.image}
                  alt={exec.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="px-2">
                <h3 className="font-serif font-semibold text-primary-foreground/90 text-sm md:text-base mb-1 group-hover:text-primary-foreground transition-colors">
                  {exec.name}
                </h3>
                <p className="text-primary-foreground/60 text-xs uppercase tracking-wide font-medium">
                  {exec.position}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Deputies */}
        <h3 className="text-xl font-semibold text-center mb-6 text-foreground">Deputy Executives</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
          {deputies.map((deputy, index) => (
            <div key={index} className="text-center p-4 bg-background rounded-lg border border-border">
              <h4 className="font-semibold text-foreground text-sm">{deputy.name}</h4>
              <p className="text-muted-foreground text-xs">{deputy.position}</p>
            </div>
          ))}
        </div>

        {/* Advisors */}
        <h3 className="text-xl font-semibold text-center mb-6 text-foreground">Advisors</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 max-w-5xl mx-auto">
          {advisors.map((advisor, index) => (
            <div key={index} className="text-center p-3 bg-background rounded-lg border border-border">
              <h4 className="font-semibold text-foreground text-xs">{advisor.name}</h4>
              <p className="text-muted-foreground text-[10px]">{advisor.position}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Executives;
