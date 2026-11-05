// src/layouts/RootLayout.jsx
// Lenis smooth scroll + GSAP ScrollTrigger + section reveals.
// Preloader gates the initial animation.
import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

export default function RootLayout() {
  const [entered, setEntered] = useState(false);
  const lenisRef = useRef(null);

  // Lock scroll until preloader finishes
  useEffect(() => {
    document.documentElement.style.overflow = entered ? "" : "hidden";
    return () => { document.documentElement.style.overflow = ""; };
  }, [entered]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.92 });
    lenisRef.current = lenis;
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);

    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.fromTo(el, { y: 22, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    });

    const refresh = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      clearTimeout(refresh);
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <div className="viewport-frame" aria-hidden="true" />
      <div className="cursor-glow" aria-hidden="true" />
      {!entered && <Preloader onDone={() => { setEntered(true); setTimeout(() => ScrollTrigger.refresh(), 200); }} />}
      <div style={{ opacity: entered ? 1 : 0, transition: "opacity .6s ease" }}>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
