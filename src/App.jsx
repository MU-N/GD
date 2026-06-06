import { useCallback, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll, Preload } from "@react-three/drei";
import * as THREE from "three";

import Level from "./scene/Level.jsx";
import CameraRig from "./scene/CameraRig.jsx";
import Effects from "./scene/Effects.jsx";
import ScrollReporter from "./scene/ScrollReporter.jsx";

import Nav from "./ui/Nav.jsx";
import Hero from "./ui/Hero.jsx";
import Work from "./ui/Work.jsx";
import Skills from "./ui/Skills.jsx";
import Contact from "./ui/Contact.jsx";

import { sections } from "./data/content.js";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

// Sections each fill at least one viewport, but content (e.g. the Work grid)
// can exceed it. drei sizes its scroll container by `pages`, so a fixed count
// clips the overflow. Measure the real overlay height and derive pages from it
// so every section — including Contact at the very bottom — stays reachable.
function Overlay({ onHeight, children }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const report = () => onHeight(el.scrollHeight);
    const ro = new ResizeObserver(report);
    ro.observe(el);
    report();
    return () => ro.disconnect();
  }, [onHeight]);
  return <div ref={ref}>{children}</div>;
}

export default function App() {
  const reducedMotion = usePrefersReducedMotion();
  const [pages, setPages] = useState(sections.length);

  const onHeight = useCallback((height) => {
    const vh = window.innerHeight || 1;
    // a hair of buffer so the final section's padding never clips
    const next = Math.max(sections.length, Math.ceil(height / vh) + 0.05);
    setPages((prev) => (Math.abs(prev - next) > 0.01 ? next : prev));
  }, []);

  return (
    <>
      <Nav />
      <span className="scroll-hint">Scroll to explore ↓</span>

      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 1.2, 9], fov: 55, near: 0.1, far: 400 }}
        onCreated={({ scene, gl }) => {
          scene.fog = new THREE.FogExp2("#07070b", 0.018);
          gl.setClearColor("#07070b");
        }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 8, 5]} intensity={0.8} />
        <pointLight position={[0, 0, 5]} intensity={20} distance={40} color="#6d8bff" />

        <ScrollControls pages={pages} damping={0.25}>
          <CameraRig reducedMotion={reducedMotion} />
          <ScrollReporter />
          <Level reducedMotion={reducedMotion} />

          <Scroll html style={{ width: "100%" }}>
            <Overlay onHeight={onHeight}>
              <Hero />
              <Work />
              <Skills />
              <Contact />
            </Overlay>
          </Scroll>
        </ScrollControls>

        <Effects />
        <Preload all />
      </Canvas>
    </>
  );
}
