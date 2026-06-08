import { Plus, X } from "lucide-react";
import { ImageUploader } from "@/components/admin/ImageUploader";

interface TeamGalleryManagerProps {
  teamImages: string[];
  btsImages: string[];
  onUpdateTeam: (images: string[]) => void;
  onUpdateBTS: (images: string[]) => void;
}

export function TeamGalleryManager({ teamImages, btsImages, onUpdateTeam, onUpdateBTS }: TeamGalleryManagerProps) {
  const handleAddTeamImage = (url: string) => {
    onUpdateTeam([...teamImages, url]);
  };

  const handleRemoveTeamImage = (index: number) => {
    onUpdateTeam(teamImages.filter((_, i) => i !== index));
  };

  const handleAddBTSImage = (url: string) => {
    onUpdateBTS([...btsImages, url]);
  };

  const handleRemoveBTSImage = (index: number) => {
    onUpdateBTS(btsImages.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8">
      {/* Team Images */}
      <div className="p-4 bg-charcoal/40 border border-amber-gold/30 rounded space-y-4">
        <h4 className="text-sm font-medium text-amber-gold">Team Photos ({teamImages.length})</h4>

        {teamImages.length > 0 && (
          <div className="grid grid-cols-4 gap-2">
            {teamImages.map((image, idx) => (
              <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-amber-gold/20">
                <img src={image} alt={`Team photo ${idx + 1}`} className="w-full h-full object-cover" />
                <button
                  onClick={() => handleRemoveTeamImage(idx)}
                  className="absolute top-1 right-1 p-1 bg-espresso/80 rounded opacity-0 group-hover:opacity-100 transition"
                >
                  <X className="w-3 h-3 text-cream" />
                </button>
              </div>
            ))}
          </div>
        )}

        <ImageUploader
          onUpload={handleAddTeamImage}
          label="Add Team Photo"
        />
      </div>

      {/* Behind the Scenes Images */}
      <div className="p-4 bg-charcoal/40 border border-amber-gold/30 rounded space-y-4">
        <h4 className="text-sm font-medium text-amber-gold">Behind the Scenes Photos ({btsImages.length})</h4>

        {btsImages.length > 0 && (
          <div className="grid grid-cols-4 gap-2">
            {btsImages.map((image, idx) => (
              <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-amber-gold/20">
                <img src={image} alt={`BTS photo ${idx + 1}`} className="w-full h-full object-cover" />
                <button
                  onClick={() => handleRemoveBTSImage(idx)}
                  className="absolute top-1 right-1 p-1 bg-espresso/80 rounded opacity-0 group-hover:opacity-100 transition"
                >
                  <X className="w-3 h-3 text-cream" />
                </button>
              </div>
            ))}
          </div>
        )}

        <ImageUploader
          onUpload={handleAddBTSImage}
          label="Add Behind the Scenes Photo"
        />
      </div>
    </div>
  );
}
