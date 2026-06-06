// Shared spatial layout so the camera rig, checkpoints and path all agree.
import { sections } from "../data/content.js";

export const SECTION_GAP = 24; // world units between checkpoints along -Z

export const COUNT = sections.length;

// World-space anchor for each section the camera travels to.
export const anchors = sections.map((s, i) => ({
  id: s.id,
  // alternate a gentle left/right sway so the "level" curves as you descend
  x: (i % 2 === 0 ? -1 : 1) * (i === 0 ? 0 : 3),
  y: 0,
  z: -i * SECTION_GAP,
}));

export const pathStart = anchors[0];
export const pathEnd = anchors[COUNT - 1];
