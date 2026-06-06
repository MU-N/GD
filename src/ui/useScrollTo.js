import { useScroll } from "@react-three/drei";
import { sections } from "../data/content.js";

// Programmatic scrolling for the overlay nav/buttons. drei's ScrollControls owns
// the scroll container (not the document), so #anchor links don't work — we
// animate its scrollTop to the target section's fraction instead.
export function useScrollTo() {
  const scroll = useScroll();

  return (id) => {
    const index = Math.max(0, sections.findIndex((s) => s.id === id));
    const fraction = sections.length > 1 ? index / (sections.length - 1) : 0;
    const el = scroll.el;
    const top = fraction * (el.scrollHeight - el.clientHeight);
    el.scrollTo({ top, behavior: "smooth" });
  };
}
