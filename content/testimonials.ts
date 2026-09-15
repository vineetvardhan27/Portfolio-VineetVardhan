export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  projectSlug?: string;
  avatarUrl?: string;
}

// As per Design.md and Build-Prompt.md: Only verified testimonials are displayed.
export const testimonials: Testimonial[] = [
  {
    id: "hgv-1",
    quote:
      "Vineet transformed our hotel's digital presence. Direct inquiries through the website increased immediately, and the room showcase looks stunning on mobile.",
    author: "Ohm Adhikari",
    role: "Managing Director",
    company: "Hotel Greenery View",
    projectSlug: "hotel-greenery-view",
  },
];
