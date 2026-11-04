import { Hero } from "@/components/Hero";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { Services } from "@/components/Services";
import { Pricing } from "@/components/Pricing";
import { Process } from "@/components/Process";
import { WhyWorkWithMe } from "@/components/WhyWorkWithMe";
import { Testimonials } from "@/components/Testimonials";
import { FinalCTA } from "@/components/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProjectsGrid />
      <Services />
      <Pricing />
      <Process />
      <WhyWorkWithMe />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
