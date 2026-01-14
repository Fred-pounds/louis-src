import { useState } from 'react';
import { X } from 'lucide-react';
import gallery1 from '@/assets/gallery-1.jpg';
import gallery2 from '@/assets/gallery-2.jpg';
import gallery3 from '@/assets/gallery-3.jpg';
import gallery4 from '@/assets/gallery-4.jpg';
import gallery5 from '@/assets/gallery-5.jpg';
import gallery6 from '@/assets/gallery-6.jpg';
import srcGroup from '@/assets/src-group.jpg';
import heroSchool from '@/assets/hero-school.jpg';

const galleryImages = [
  { src: gallery1, alt: 'Opening Ceremony' },
  { src: gallery2, alt: 'Workshops' },
  { src: gallery3, alt: 'Sports Day' },
  { src: gallery4, alt: 'Talent Show' },
  { src: gallery5, alt: 'Community Service' },
  { src: gallery6, alt: 'Closing Ceremony' },
  { src: srcGroup, alt: 'SRC Group' },
  { src: heroSchool, alt: 'School Campus' },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <section id="gallery" className="py-24 bg-background relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto px-4">
          <h2 className="section-heading">Gallery</h2>
          <div className="section-divider" />

          {/* Masonry Grid */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 max-w-6xl mx-auto">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="break-inside-avoid cursor-zoom-in overflow-hidden rounded-xl group relative mb-4"
                onClick={() => setSelectedImage(image.src)}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 z-10" />
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Hover Overlay with Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <p className="text-white text-sm font-medium transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {image.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 hover:bg-white/10 rounded-full transition-all duration-200 z-50"
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            <X size={32} />
          </button>

          <img
            src={selectedImage}
            alt="Gallery preview"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default Gallery;
