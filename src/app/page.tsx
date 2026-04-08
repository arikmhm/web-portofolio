import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TechStackSection from "@/components/TechStackSection";
import ProjectsSection from "@/components/ProjectsSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="mt-16 flex-1">
        <HeroSection />

        <AboutSection />

        <TechStackSection />

        <ProjectsSection />

        {/* Experience */}
        <section id="experience" className="px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <p className="text-neutral-400">Phase 5e</p>
          </div>
        </section>

        {/* Education */}
        <section id="education" className="px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <p className="text-neutral-400">Phase 5f</p>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <p className="text-neutral-400">Phase 5g</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
