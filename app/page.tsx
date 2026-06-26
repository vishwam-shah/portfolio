import Hero from "@/components/main/Hero";
import Aboutme from "@/components/main/Aboutme";
import Skills from "@/components/main/Skills";
import Projects from "@/components/main/Projects";
import Experience from "@/components/main/Experience";
import Publications from "@/components/main/Publications";
import AIAssistant from "@/components/main/AIAssistant";
import Contact from "@/components/main/Contactform";
import Footer from "@/components/main/Footer";

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center">
      <Hero />
      <Aboutme />
      <Skills />
      <Projects />
      <Experience />
      <Publications />
      <AIAssistant />
      <Contact />
      <Footer />
    </main>
  );
}
