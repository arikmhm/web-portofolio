import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="mt-16 flex-1">
        {/* Hero */}
        <section id="hero" className="px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <p className="text-neutral-400">Phase 5a</p>
          </div>
        </section>

        {/* About */}
        <section id="about" className="px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <p className="text-neutral-400">Phase 5b</p>
          </div>
        </section>

        {/* Tech Stack */}
        <section id="tech-stack" className="px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <p className="text-neutral-400">Phase 5c</p>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <p className="text-neutral-400">Phase 5d</p>
          </div>
        </section>

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
