import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Camera, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

import gallery1 from '@/assets/gallery-1.jpg';
import gallery2 from '@/assets/gallery-2.jpg';
import gallery3 from '@/assets/gallery-3.jpg';
import gallery4 from '@/assets/gallery-4.jpg';
import gallery5 from '@/assets/gallery-5.jpg';
import gallery6 from '@/assets/gallery-6.jpg';

const defaultDays = [
  { day: 1, title: 'Opening Ceremony', defaultImage: gallery1 },
  { day: 2, title: 'Workshops', defaultImage: gallery2 },
  { day: 3, title: 'Sports & Competitions', defaultImage: gallery3 },
  { day: 4, title: 'Community Service', defaultImage: gallery5 },
  { day: 5, title: 'Talent Show', defaultImage: gallery4 },
  { day: 6, title: 'SRC Talks & Mentoring', defaultImage: gallery2 },
  { day: 7, title: 'Closing Ceremony', defaultImage: gallery6 },
];

interface DailyUpload {
  id: string;
  day_number: number;
  day_title: string;
  description: string;
  author_name: string;
  image_url: string | null;
  created_at: string;
}

const DailyRecapPage = () => {
  const [uploads, setUploads] = useState<DailyUpload[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  useEffect(() => {
    fetchUploads();

    const channel = supabase
      .channel('daily_uploads')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'daily_uploads' },
        () => fetchUploads()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchUploads = async () => {
    const { data, error } = await supabase
      .from('daily_uploads')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setUploads(data);
    }
    setLoading(false);
  };

  const getUploadsForDay = (day: number) => {
    return uploads.filter((u) => u.day_number === day);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary py-4 px-4 fixed top-0 w-full z-50 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-primary-foreground hover:opacity-80 transition-opacity">
            <ArrowLeft size={20} />
            <span className="font-semibold">Back to Home</span>
          </Link>
          <Link to="/upload">
            <Button variant="secondary" size="sm" className="gap-2">
              <Plus size={16} />
              Upload Content
            </Button>
          </Link>
        </div>
      </header>

      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-2 font-serif">
            Daily Recap
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Browse student contributions and experiences from each day of SRC Week 2026
          </p>

          {/* Day Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Button
              variant={selectedDay === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedDay(null)}
            >
              All Days
            </Button>
            {defaultDays.map((d) => (
              <Button
                key={d.day}
                variant={selectedDay === d.day ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedDay(d.day)}
              >
                Day {d.day}
              </Button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
              <p className="text-muted-foreground mt-4">Loading contributions...</p>
            </div>
          ) : (
            <div className="space-y-12">
              {(selectedDay ? [defaultDays[selectedDay - 1]] : defaultDays).map((dayInfo) => {
                const dayUploads = getUploadsForDay(dayInfo.day);
                return (
                  <div key={dayInfo.day} className="bg-card rounded-lg p-6 shadow-sm border">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-xl">
                          {dayInfo.day}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-foreground font-serif">
                          Day {dayInfo.day} — {dayInfo.title}
                        </h2>
                        <p className="text-muted-foreground text-sm">
                          {dayUploads.length} contribution{dayUploads.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>

                    {dayUploads.length === 0 ? (
                      <div className="text-center py-8 bg-muted/30 rounded-lg">
                        <Camera className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
                        <p className="text-muted-foreground">No contributions yet for this day.</p>
                        <Link to="/upload" className="text-primary hover:underline text-sm">
                          Be the first to share!
                        </Link>
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {dayUploads.map((upload) => (
                          <div key={upload.id} className="bg-background rounded-lg overflow-hidden border">
                            {upload.image_url && (
                              <img
                                src={upload.image_url}
                                alt={upload.day_title}
                                className="w-full h-48 object-cover"
                              />
                            )}
                            <div className="p-4">
                              <h3 className="font-semibold text-foreground mb-1">{upload.day_title}</h3>
                              <p className="text-muted-foreground text-sm mb-2 line-clamp-3">
                                {upload.description}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                By {upload.author_name} •{' '}
                                {new Date(upload.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DailyRecapPage;
