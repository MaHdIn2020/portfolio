// src/pages/Home.jsx
// Single-page assembly in editorial order.
import Hero from "../components/Hero";
import VideoDivider from "../components/VideoDivider";
import About from "./About";
import Work from "./Work";
import Skills from "./Skills";
import Research from "./Research";
import Journey from "./Journey";
import Contact from "./Contact";

export default function Home() {
  return (
    <main style={{ position: "relative", zIndex: 1 }}>
      <Hero />
      <About />
      <VideoDivider />
      <Work />
      <Skills />
      <Research />
      <Journey />
      <Contact />
    </main>
  );
}
