import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TechStackSection from "@/components/TechStackSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="mt-16 flex-1">
        <HeroSection />

        <AboutSection />

        <TechStackSection />

        <ProjectsSection />

        <ExperienceSection />

        <EducationSection />

        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
