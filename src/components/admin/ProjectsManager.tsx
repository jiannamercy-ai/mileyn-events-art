import { useState } from "react";
import { TextInput } from "./TextInput";
import { TextArea } from "./TextArea";
import { ImageUploader } from "./ImageUploader";
import { ImageGallery } from "./ImageGallery";
import { ArrayManager } from "./ArrayManager";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import type { Project } from "@/data/site";

interface ProjectsManagerProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
  disabled?: boolean;
}

export function ProjectsManager({ projects, onChange, disabled }: ProjectsManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const createNewProject = (): Project => ({
    slug: `project-${Date.now()}`,
    name: "",
    type: "",
    location: "",
    guests: "",
    date: "",
    img: "",
    gallery: [],
    story: "",
    highlights: [],
    testimonial: undefined,
  });

  const addProject = () => {
    onChange([...projects, createNewProject()]);
  };

  const updateProject = (slug: string, updates: Partial<Project>) => {
    onChange(
      projects.map((p) => (p.slug === slug ? { ...p, ...updates } : p))
    );
  };

  const removeProject = (slug: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      onChange(projects.filter((p) => p.slug !== slug));
      setEditingId(null);
    }
  };

  const editingProject = projects.find((p) => p.slug === editingId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl text-amber-gold">Projects / Portfolio</h3>
        <button
          onClick={addProject}
          disabled={disabled}
          className="flex items-center gap-2 px-3 py-2 bg-amber-gold/20 hover:bg-amber-gold/30 border border-amber-gold/50 rounded text-amber-gold text-xs uppercase tracking-[0.15em] transition-colors disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-2">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="flex items-center gap-3 p-3 bg-charcoal/40 border border-amber-gold/30 rounded hover:border-amber-gold/50 transition-colors"
          >
            {project.img && (
              <img src={project.img} alt={project.name} className="w-12 h-12 rounded object-cover flex-shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-cream truncate">{project.name || "Untitled Project"}</p>
              <p className="text-xs text-cream/50 truncate">{project.type}</p>
            </div>
            <button
              onClick={() => setEditingId(editingId === project.slug ? null : project.slug)}
              className="p-2 hover:bg-amber-gold/20 rounded transition-colors"
            >
              <Edit2 className="w-4 h-4 text-amber-gold" />
            </button>
            <button
              onClick={() => removeProject(project.slug)}
              disabled={disabled}
              className="p-2 hover:bg-red-400/20 rounded transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4 text-red-400" />
            </button>
          </div>
        ))}
      </div>

      {/* Edit Panel */}
      {editingProject && (
        <div className="p-6 bg-charcoal/60 border border-amber-gold/30 rounded space-y-6 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between sticky top-0 bg-charcoal/60 pb-4">
            <h4 className="font-display text-lg text-amber-gold">Edit Project</h4>
            <button
              onClick={() => setEditingId(null)}
              className="p-1 hover:bg-amber-gold/20 rounded transition-colors"
            >
              <X className="w-4 h-4 text-amber-gold" />
            </button>
          </div>

          {/* Basic Info */}
          <div className="space-y-4">
            <TextInput
              value={editingProject.slug}
              onChange={(slug) => {
                const oldSlug = editingProject.slug;
                updateProject(oldSlug, { slug });
                setEditingId(slug);
              }}
              label="Project ID (slug)"
              disabled={disabled}
              helperText="Unique identifier, use hyphens (e.g., the-pearl-wedding)"
            />
            <TextInput
              value={editingProject.name}
              onChange={(name) => updateProject(editingProject.slug, { name })}
              label="Project Name"
              disabled={disabled}
              required
            />
            <TextInput
              value={editingProject.type}
              onChange={(type) => updateProject(editingProject.slug, { type })}
              label="Project Type"
              disabled={disabled}
              placeholder="e.g., Wedding Destination"
              required
            />
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextInput
              value={editingProject.location}
              onChange={(location) => updateProject(editingProject.slug, { location })}
              label="Location"
              disabled={disabled}
              placeholder="e.g., Karen, Nairobi"
            />
            <TextInput
              value={editingProject.guests}
              onChange={(guests) => updateProject(editingProject.slug, { guests })}
              label="Guests"
              disabled={disabled}
              placeholder="e.g., 180 guests"
            />
            <TextInput
              value={editingProject.date}
              onChange={(date) => updateProject(editingProject.slug, { date })}
              label="Date"
              disabled={disabled}
              placeholder="e.g., October 2024"
            />
          </div>

          {/* Hero Image */}
          <ImageUploader
            value={editingProject.img}
            onChange={(img) => updateProject(editingProject.slug, { img })}
            label="Hero/Cover Image"
            disabled={disabled}
          />

          {/* Gallery - Multiple Images */}
          <ImageGallery
            images={editingProject.gallery}
            onChange={(gallery) => updateProject(editingProject.slug, { gallery })}
            label="Project Gallery (Unlimited Images)"
            disabled={disabled}
          />

          {/* Story */}
          <TextArea
            value={editingProject.story}
            onChange={(story) => updateProject(editingProject.slug, { story })}
            label="Project Story"
            placeholder="Tell the story of this project..."
            disabled={disabled}
            rows={5}
          />

          {/* Highlights */}
          <ArrayManager<string>
            items={editingProject.highlights}
            onChange={(highlights) => updateProject(editingProject.slug, { highlights })}
            label="Project Highlights"
            disabled={disabled}
            createNew={() => ""}
            renderItem={(highlight, _index, onChange) => (
              <TextInput
                value={highlight}
                onChange={onChange}
                placeholder="e.g., 6,000 garden roses"
                disabled={disabled}
              />
            )}
          />

          {/* Testimonial */}
          <div className="p-4 bg-charcoal/40 border border-amber-gold/30 rounded space-y-3">
            <h4 className="text-sm font-medium text-amber-gold">Testimonial (Optional)</h4>
            <TextArea
              value={editingProject.testimonial?.quote || ""}
              onChange={(quote) =>
                updateProject(editingProject.slug, {
                  testimonial: quote ? { quote, author: editingProject.testimonial?.author || "" } : undefined,
                })
              }
              label="Quote"
              placeholder="Client testimonial..."
              disabled={disabled}
              rows={3}
            />
            <TextInput
              value={editingProject.testimonial?.author || ""}
              onChange={(author) =>
                updateProject(editingProject.slug, {
                  testimonial: author ? { quote: editingProject.testimonial?.quote || "", author } : undefined,
                })
              }
              label="Attribution"
              placeholder="e.g., A. & J., Karen"
              disabled={disabled}
            />
          </div>
        </div>
      )}

      {projects.length === 0 && (
        <div className="text-center py-8 text-cream/50">
          <p>No projects yet. Click "Add Project" to create one.</p>
        </div>
      )}
    </div>
  );
}
