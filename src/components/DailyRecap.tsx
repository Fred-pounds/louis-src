import { Link } from 'react-router-dom';
import { ArrowRight, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';

import gallery1 from '@/assets/gallery-1.jpg';
import gallery2 from '@/assets/gallery-2.jpg';
import gallery3 from '@/assets/gallery-3.jpg';
import gallery4 from '@/assets/gallery-4.jpg';
import gallery5 from '@/assets/gallery-5.jpg';
import gallery6 from '@/assets/gallery-6.jpg';

const recapData = [
  {
    day: 'Day 1',
    title: 'Opening Ceremony',
    description: 'SRC Week 2026 kicked off with an inspiring opening ceremony in the school hall. Students gathered to celebrate the beginning of an exciting week filled with activities.',
    image: gallery1,
  },
  {
    day: 'Day 2',
    title: 'Workshops',
    description: 'Interactive workshops were held in various classrooms, engaging students in learning and discussions on leadership, personal development, and career guidance.',
    image: gallery2,
  },
  {
    day: 'Day 3',
    title: 'Sports & Competitions',
    description: 'Exciting sports events and competitions took place on the field and in the hall. Students showcased their athletic abilities and team spirit.',
    image: gallery3,
  },
];

const DailyRecap = () => {
  return (
    <section id="recap" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">Daily Recap</h2>
        <div className="section-divider" />

        <div className="max-w-4xl mx-auto space-y-12">
          {recapData.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } gap-8 items-center`}
            >
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-primary mb-2 font-serif">
                  {item.day} — {item.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="flex-1">
                <img
                  src={item.image}
                  alt={`${item.day} - ${item.title}`}
                  className="w-full h-48 md:h-56 object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 max-w-2xl mx-auto">
            <Camera className="mx-auto h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2 font-serif">
              Share Your SRC Week Experience!
            </h3>
            <p className="text-muted-foreground mb-6">
              Students can upload photos and stories from each day. See all contributions and add your own memories.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/daily-recap">
                <Button variant="outline" className="gap-2 w-full sm:w-auto">
                  View All Contributions
                  <ArrowRight size={16} />
                </Button>
              </Link>
              <Link to="/upload">
                <Button className="gap-2 w-full sm:w-auto">
                  <Camera size={16} />
                  Upload Your Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyRecap;
