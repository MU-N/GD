import { useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { navStore } from "../ui/navStore.js";
import { COUNT } from "./layout.js";

// Lives inside the Canvas / ScrollControls context and publishes scroll state
// to the external navStore so the fixed DOM nav can read + control it.
export default function ScrollReporter() {
  const scroll = useScroll();

  useEffect(() => {
    navStore.setEl(scroll.el);
  }, [scroll]);

  useFrame(() => {
    const active = Math.round(scroll.offset * (COUNT - 1));
    navStore.setActive(active);
  });

  return null;
}
