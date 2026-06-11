import Hero from "../components/hero/Hero";
import AboutMe from "../components/about/AboutMe";
import Projects from "../components/projects/Projects";
import Skills from "../components/skills/Skills";
import Achievements from "../components/achievements/Achievements";
import Contact from "../components/contact/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutMe />
      <Projects />
      <Skills />
      <Achievements />
      <Contact />
    </main>
  );
}
