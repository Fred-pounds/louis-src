import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, ImagePlus, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const dayOptions = [
  { value: '1', label: 'Day 1 - Opening Ceremony' },
  { value: '2', label: 'Day 2 - Workshops' },
  { value: '3', label: 'Day 3 - Sports & Competitions' },
  { value: '4', label: 'Day 4 - Community Service' },
  { value: '5', label: 'Day 5 - Talent Show' },
  { value: '6', label: 'Day 6 - SRC Talks & Mentoring' },
  { value: '7', label: 'Day 7 - Closing Ceremony' },
];

const UploadPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [dayNumber, setDayNumber] = useState('');
  const [dayTitle, setDayTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: 'Please select an image under 5MB.',
          variant: 'destructive',
        });
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDayChange = (value: string) => {
    setDayNumber(value);
    const selected = dayOptions.find((d) => d.value === value);
    if (selected) {
      setDayTitle(selected.label.split(' - ')[1]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!dayNumber || !dayTitle || !authorName || !description) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = null;

      // Upload image if provided
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('daily-uploads')
          .upload(fileName, imageFile);

        if (uploadError) {
          throw uploadError;
        }

        const { data: urlData } = supabase.storage
          .from('daily-uploads')
          .getPublicUrl(fileName);

        imageUrl = urlData.publicUrl;
      }

      // Insert into database
      const { error: insertError } = await supabase.from('daily_uploads').insert({
        day_number: parseInt(dayNumber),
        day_title: dayTitle,
        author_name: authorName.trim(),
        description: description.trim(),
        image_url: imageUrl,
      });

      if (insertError) {
        throw insertError;
      }

      toast({
        title: 'Success!',
        description: 'Your contribution has been uploaded successfully.',
      });

      navigate('/daily-recap');
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload failed',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary py-4 px-4 fixed top-0 w-full z-50 shadow-md">
        <div className="container mx-auto flex items-center">
          <Link to="/daily-recap" className="flex items-center gap-2 text-primary-foreground hover:opacity-80 transition-opacity">
            <ArrowLeft size={20} />
            <span className="font-semibold">Back to Daily Recap</span>
          </Link>
        </div>
      </header>

      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-xl">
          <h1 className="text-3xl font-bold text-center text-foreground mb-2 font-serif">
            Share Your Experience
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Upload photos and stories from SRC Week 2026
          </p>

          <form onSubmit={handleSubmit} className="bg-card rounded-lg p-6 shadow-sm border space-y-6">
            {/* Day Selection */}
            <div className="space-y-2">
              <Label htmlFor="day">Select Day *</Label>
              <Select value={dayNumber} onValueChange={handleDayChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a day" />
                </SelectTrigger>
                <SelectContent>
                  {dayOptions.map((day) => (
                    <SelectItem key={day.value} value={day.value}>
                      {day.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Custom Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={dayTitle}
                onChange={(e) => setDayTitle(e.target.value)}
                placeholder="e.g., Amazing Dance Performance"
                maxLength={100}
              />
            </div>

            {/* Author Name */}
            <div className="space-y-2">
              <Label htmlFor="author">Your Name *</Label>
              <Input
                id="author"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Enter your name"
                maxLength={50}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">What happened? *</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what happened during this activity..."
                rows={4}
                maxLength={1000}
              />
              <p className="text-xs text-muted-foreground text-right">
                {description.length}/1000
              </p>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Photo (Optional)</Label>
              <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-48 mx-auto rounded-lg object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="mt-2"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(null);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <label className="cursor-pointer block py-4">
                    <ImagePlus className="mx-auto h-12 w-12 text-muted-foreground/50 mb-2" />
                    <span className="text-sm text-muted-foreground">
                      Click to upload a photo (max 5MB)
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={18} />
                  Submit Contribution
                </>
              )}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default UploadPage;
