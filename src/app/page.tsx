import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileSection from "@/components/ProfileSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import BackToTop from "@/components/BackToTop";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <>
      <Navbar />
      <BackToTop />
      <ChatWidget />
      <main className="flex-1 divide-y divide-gray-200">
        <ProfileSection />

        <ProjectsSection />

        <ExperienceSection />

        <EducationSection />

        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
