import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";
import { anchors } from "./layout.js";

// Scroll drives the camera along the level path; the mouse adds gentle parallax.
// Walking the level == scrolling the page.
export default function CameraRig({ reducedMotion }) {
  const scroll = useScroll();
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3());

  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        anchors.map((a) => new THREE.Vector3(a.x, a.y, a.z))
      ),
    []
  );

  useFrame((state, delta) => {
    const offset = THREE.MathUtils.clamp(scroll.offset, 0, 1);

    // position the camera slightly above & behind the point on the path
    const here = curve.getPointAt(offset);
    const ahead = curve.getPointAt(Math.min(offset + 0.001, 1));

    const px = here.x;
    const py = here.y + 1.2;
    const pz = here.z + 9; // hang back so the checkpoint sits in frame

    // mouse parallax (skip if the user prefers reduced motion)
    const mx = reducedMotion ? 0 : state.pointer.x * 1.4;
    const my = reducedMotion ? 0 : state.pointer.y * 0.9;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, px + mx, 4, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, py + my, 4, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, pz, 5, delta);

    // look a touch further down the path for a sense of forward travel
    target.current.set(ahead.x, ahead.y + 0.6, ahead.z - 6);
    camera.lookAt(target.current);
  });

  return null;
}
