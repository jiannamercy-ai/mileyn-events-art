// Central data store. Edit freely — slugs are stable.

export type Service = {
  slug: string;
  name: string;
  tagline: string;
  img: string;
  intro: string;
  whatsIncluded: string[];
  process: { title: string; body: string }[];
  signature: string;
  starting: string;
};

export const SERVICES: Service[] = [
  {
    slug: "luxury-weddings",
    name: "Luxury Weddings",
    tagline: "Heirloom moments, designed in whispers.",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=75",
    intro:
      "A Mileyn wedding is composed, not assembled. From the first venue walk to the last sparkler, we orchestrate every detail with quiet precision so the day belongs entirely to you.",
    whatsIncluded: [
      "Full creative direction & art-led design boards",
      "Venue scouting, contracting & layout architecture",
      "Bespoke floral, lighting & tablescape design",
      "Vendor curation, negotiation & on-day stewardship",
      "Bridal-party concierge & guest experience design",
      "Production timeline, rehearsals & day-of command",
    ],
    process: [
      { title: "Discovery", body: "An unhurried conversation. We listen for what you actually want — not just what you say." },
      { title: "Design", body: "Mood films, palette studies, scaled floor plans. Nothing leaves our studio half-formed." },
      { title: "Curation", body: "We hand-select every vendor, every linen, every stem. Excellence is our only filter." },
      { title: "Production", body: "A 200+ point run-of-show. Backups for the backups. You enjoy your day." },
      { title: "Afterglow", body: "Edited gallery, vendor thank-yous, anniversary keepsake. The story doesn't end at the send-off." },
    ],
    signature: "We accept a limited number of weddings each year. Inquire early.",
    starting: "From KSh 1.8M",
  },
  {
    slug: "corporate-galas",
    name: "Corporate Galas & Launches",
    tagline: "Brands made memorable, in candlelight.",
    img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=75",
    intro:
      "Award nights, product launches, founder dinners. We translate brand into atmosphere — moments your guests photograph but never forget.",
    whatsIncluded: [
      "Brand-aligned creative concept & narrative",
      "Stage, AV, lighting & content production",
      "Guest journey from RSVP to send-off gift",
      "Press, photography & live-content management",
      "Speaker briefings, run-sheets & rehearsal direction",
      "Hospitality, catering & curated bar programmes",
    ],
    process: [
      { title: "Brief", body: "We unpack the business outcome before we touch the design." },
      { title: "Concept", body: "A single defensible idea — then everything serves it." },
      { title: "Build", body: "Vendors, sets, content, comms. We project-manage the whole machine." },
      { title: "Showtime", body: "On-site command, real-time problem solving, perfectly invisible." },
      { title: "Wrap", body: "Reporting, content delivery, lessons captured for next year." },
    ],
    signature: "Discreet NDA-friendly engagements available.",
    starting: "From KSh 950K",
  },
  {
    slug: "private-celebrations",
    name: "Private Celebrations",
    tagline: "Intimate evenings, impeccably orchestrated.",
    img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1600&q=75",
    intro:
      "Milestone birthdays, anniversaries, engagement dinners, baby welcomes. Smaller in scale, never in care.",
    whatsIncluded: [
      "Concept & guest-experience design",
      "Florist, chef, sommelier & musician curation",
      "Tablescape, stationery & favour design",
      "Discreet on-night hosting team",
      "Photography & cinematic recap film",
    ],
    process: [
      { title: "Listen", body: "Whose night is it really? We design for the honouree, not the room." },
      { title: "Compose", body: "A short, beautiful brief. Approved in one sitting." },
      { title: "Host", body: "We arrive early, leave last. You are a guest at your own party." },
    ],
    signature: "Ideal for 20–120 guests.",
    starting: "From KSh 450K",
  },
  {
    slug: "destination-events",
    name: "Destination Events",
    tagline: "Anywhere in the world. Effortlessly yours.",
    img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&q=75",
    intro:
      "Diani, Lamu, Cape Town, Tuscany, Santorini. We've produced weddings and retreats across three continents — with the same standard you'd expect at home.",
    whatsIncluded: [
      "Destination scouting & multi-day itinerary design",
      "Guest travel, transfers & accommodation blocks",
      "Local vendor sourcing & cultural liaison",
      "Permits, insurance & compliance management",
      "Welcome bags, excursions & farewell brunches",
    ],
    process: [
      { title: "Recce", body: "We visit before you do. Twice." },
      { title: "Design", body: "A weekend, not just a wedding. Three days of curated moments." },
      { title: "Move", body: "We travel with you. Full team on-site." },
    ],
    signature: "Currently booking through 2027.",
    starting: "From KSh 3.2M",
  },
  {
    slug: "floral-decor",
    name: "Floral & Décor Design",
    tagline: "Botanical compositions with quiet drama.",
    img: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=1600&q=75",
    intro:
      "Our in-house floral atelier creates installations that feel grown, not arranged. Available as a stand-alone service for weddings and venues.",
    whatsIncluded: [
      "Ceremony arches, aisles & altar pieces",
      "Long-table runners & low centerpieces",
      "Hanging clouds, chandelier installations",
      "Bouquet, boutonniere & flower-crown design",
      "Linen, glassware & tablescape styling",
    ],
    process: [
      { title: "Palette", body: "Stems chosen by season, not by shopping list." },
      { title: "Mock-up", body: "Full-scale studio mock before approval." },
      { title: "Install", body: "On-site team, ladders, gloves, repeat." },
    ],
    signature: "Sustainable & locally-sourced where possible.",
    starting: "From KSh 180K",
  },
  {
    slug: "production-management",
    name: "Event Production & Management",
    tagline: "Every wire, every cue, invisibly perfect.",
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=75",
    intro:
      "For clients who already have a designer or planner — we are the operational layer that keeps the show running.",
    whatsIncluded: [
      "Run-of-show authoring & rehearsals",
      "AV, lighting & staging direction",
      "Vendor coordination & load-in management",
      "Risk register & contingency planning",
      "On-site command with radio comms",
    ],
    process: [
      { title: "Audit", body: "We arrive, we learn the brief, we map every dependency." },
      { title: "Tighten", body: "Schedules, scripts, cues. Nothing left to chance." },
      { title: "Run", body: "On the night, we're the calm in your earpiece." },
    ],
    signature: "Available as a stand-alone hire.",
    starting: "From KSh 320K",
  },
  {
    slug: "event-production",
    name: "Event Production",
    tagline: "Full-scale production excellence.",
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=75",
    intro:
      "From concept through execution, we manage every technical and logistical element of your event with precision and expertise.",
    whatsIncluded: [
      "End-to-end event planning & coordination",
      "Timeline & run-of-show development",
      "Vendor management & logistics",
      "On-site production direction",
      "Risk management & contingency planning",
    ],
    process: [
      { title: "Plan", body: "We develop detailed timelines and coordinate all moving parts." },
      { title: "Prepare", body: "Vendor coordination, rehearsals, and contingency planning." },
      { title: "Produce", body: "On-site management ensuring seamless execution." },
    ],
    signature: "Scalable for events of any size.",
    starting: "From KSh 320K",
  },
  {
    slug: "event-design-styling",
    name: "Event Design & Styling",
    tagline: "Aesthetic vision brought to life.",
    img: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=1600&q=75",
    intro:
      "Our design team creates cohesive, memorable environments that reflect your vision through thoughtful styling and creative direction.",
    whatsIncluded: [
      "Creative concept & mood development",
      "Color palette & design board creation",
      "Space planning & layout architecture",
      "Décor installation & styling",
      "Lighting & ambiance design",
    ],
    process: [
      { title: "Concept", body: "We develop a creative vision aligned with your goals." },
      { title: "Design", body: "Detailed mood boards and spatial planning." },
      { title: "Install", body: "Our team brings the design to life on-site." },
    ],
    signature: "Available as standalone or integrated service.",
    starting: "From KSh 250K",
  },
  {
    slug: "tent-infrastructure",
    name: "Tent & Infrastructure Solutions",
    tagline: "Structural elegance for outdoor events.",
    img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&q=75",
    intro:
      "We source and install premium tent structures, flooring, and infrastructure that combine functionality with aesthetic excellence.",
    whatsIncluded: [
      "Tent selection & sizing consultation",
      "Flooring & foundation solutions",
      "Lighting & climate control integration",
      "Setup, installation & breakdown",
      "Structural safety & compliance",
    ],
    process: [
      { title: "Survey", body: "We assess your venue and design appropriate structures." },
      { title: "Source", body: "Premium suppliers for tents, flooring, and utilities." },
      { title: "Install", body: "Professional setup ensuring stability and aesthetics." },
    ],
    signature: "Ideal for garden, rooftop, and outdoor venues.",
    starting: "From KSh 400K",
  },
  {
    slug: "premium-rentals",
    name: "Premium Event Rentals",
    tagline: "Curated furnishings for elevated occasions.",
    img: "https://images.unsplash.com/photo-1530023367847-a683933f4172?auto=format&fit=crop&w=1600&q=75",
    intro:
      "Hand-selected furniture, linens, glassware, and décor pieces that elevate your event with sophistication and style.",
    whatsIncluded: [
      "Furniture & seating selection",
      "Premium linens & table settings",
      "Glassware, china & flatware",
      "Décor accessories & centerpieces",
      "Delivery, setup & styling",
    ],
    process: [
      { title: "Consult", body: "We understand your aesthetic and recommend pieces." },
      { title: "Curate", body: "Selection of items that create cohesive environments." },
      { title: "Deliver", body: "Professional setup and styling services included." },
    ],
    signature: "Quality over quantity — always.",
    starting: "From KSh 150K",
  },
];

export type Project = {
  slug: string;
  name: string;
  type: string;
  location: string;
  guests: string;
  date: string;
  img: string;
  gallery: string[];
  story: string;
  highlights: string[];
  testimonial?: { quote: string; author: string };
};

export const PROJECTS: Project[] = [
  {
    slug: "the-pearl-wedding",
    name: "The Pearl Wedding",
    type: "Wedding Destination",
    location: "Karen, Nairobi",
    guests: "180 guests",
    date: "October 2024",
    img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=75",
    gallery: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=75",
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=1400&q=75",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1400&q=75",
    ],
    story:
      "A garden wedding in cream and pearl, set under a hand-built cathedral of locally-grown roses. The couple wanted softness without sweetness. We worked in tonal whites, raw silk, and antique brass.",
    highlights: ["6,000 garden roses", "Hand-calligraphed menus", "String quartet at sunset", "Late-night pearl bar"],
    testimonial: {
      quote: "We didn't know a day could feel this composed. Mileyn made the impossible look obvious.",
      author: "A. & J., Karen",
    },
  },
  {
    slug: "the-executive-gala",
    name: "The Executive Gala",
    type: "Corporate Gala Launch",
    location: "Villa Rosa Kempinski",
    guests: "420 guests",
    date: "December 2024",
    img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1600&q=75",
    gallery: [
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1400&q=75",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=75",
    ],
    story:
      "A pan-African leadership awards night. We replaced the obligatory hotel ballroom feel with a moody, candlelit theatre — black velvet, brass uplights, and a slow reveal of the winners' wall.",
    highlights: ["12-camera livestream", "Custom brass trophies", "Live orchestra", "Press lounge with bespoke cocktails"],
  },
  {
    slug: "garden-soiree",
    name: "Garden Soirée",
    type: "Private Anniversary",
    location: "Limuru",
    guests: "60 guests",
    date: "March 2024",
    img: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1600&q=75",
    gallery: [
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1400&q=75",
      "https://images.unsplash.com/photo-1530023367847-a683933f4172?auto=format&fit=crop&w=1400&q=75",
    ],
    story: "A 60th birthday lunch on the lawn — long oak tables, citrus tones, and a six-course menu under an open sky.",
    highlights: ["Wood-fired chef's table", "Vintage china rental", "Live cellist", "Hand-pressed citrus cocktails"],
  },
  {
    slug: "coastal-vow",
    name: "Coastal Vow",
    type: "Wedding Destination",
    location: "Diani Beach",
    guests: "90 guests",
    date: "August 2024",
    img: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1600&q=75",
    gallery: [
      "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1400&q=75",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1400&q=75",
    ],
    story: "A barefoot beach ceremony followed by a candlelit reception in the dunes. We brought the brand of luxury but kept the salt-air honesty.",
    highlights: ["Three-day guest itinerary", "Sunset dhow sail", "Tropical floral arches", "Open-fire seafood bar"],
  },
  {
    slug: "velvet-hour",
    name: "Velvet Hour",
    type: "Corporate Launch",
    location: "The Alchemist, Westlands",
    guests: "300 guests",
    date: "May 2024",
    img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&q=75",
    gallery: [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1400&q=75",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1400&q=75",
    ],
    story: "A fragrance launch wrapped in oxblood velvet. Perfume bar, scent-paired canapés, and a live string trio masking the brand reveal until the lights dropped.",
    highlights: ["Custom scent bar", "Velvet seating walls", "Press preview lounge", "Branded photo film"],
  },
  {
    slug: "brass-and-linen",
    name: "Brass & Linen",
    type: "Private Anniversary Celebration",
    location: "Private Residence, Runda",
    guests: "24 guests",
    date: "July 2024",
    img: "https://images.unsplash.com/photo-1530023367847-a683933f4172?auto=format&fit=crop&w=1600&q=75",
    gallery: [
      "https://images.unsplash.com/photo-1530023367847-a683933f4172?auto=format&fit=crop&w=1400&q=75",
      "https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=1400&q=75",
    ],
    story: "A 25th anniversary dinner — one long table, antique brass, raw linen, a single rose at every place. Dinner began at sunset and ended after midnight.",
    highlights: ["Five-course paired menu", "Hand-written guest letters", "Private quartet", "Heirloom dessert course"],
  },
];

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  img: string;
  bio: string;
  specialties: string[];
  years: string;
};

export const TEAM_FULL: TeamMember[] = [
  {
    slug: "sarah",
    name: "Sarah Mileyn",
    role: "Founder & Creative Director",
    img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=75",
    bio: "Sarah founded Mileyn Events after a decade designing weddings across East Africa and Europe. She believes the best events feel inevitable — as if no other version of the day could have existed.",
    specialties: ["Creative direction", "Floral design", "Brand storytelling"],
    years: "12 years",
  },
  {
    slug: "michael",
    name: "Michael Otieno",
    role: "Head of Production",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=75",
    bio: "Michael runs the operational engine. AV, staging, vendor logistics, run-of-show. If something can go wrong, he has already planned three responses to it.",
    specialties: ["Production direction", "Risk planning", "Vendor command"],
    years: "9 years",
  },
  {
    slug: "amara",
    name: "Amara Wanjiku",
    role: "Lead Floral Designer",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=900&q=75",
    bio: "Amara leads our in-house floral atelier. She trained in Amsterdam and treats stems the way a sculptor treats marble — patiently, and with a strong opinion.",
    specialties: ["Installations", "Bridal florals", "Seasonal palette work"],
    years: "7 years",
  },
  {
    slug: "david",
    name: "David Kimani",
    role: "Production Maestro",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=75",
    bio: "David runs the floor on event day. Earpiece in, clipboard tucked, calm voice. He's the reason guests never see anything go sideways.",
    specialties: ["On-site command", "Stage management", "Guest experience"],
    years: "8 years",
  },
];

export const SOCIAL = {
  whatsapp: "+254726765010", // edit me
  whatsappDisplay: "+254 726 765 010",
  email: "hello@mileynevents.com",
  instagram: "mileynevents", // handle without @
  phone: "+254726765010",
};
