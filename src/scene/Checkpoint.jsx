import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";
import { COUNT } from "./layout.js";

// An abstract "room" marker the camera arrives at for each section: a slow
// wireframe ring + a solid core that brightens and spins as it enters view.
export default function Checkpoint({ index, position, reducedMotion }) {
  const group = useRef();
  const core = useRef();
  const ring = useRef();
  const scroll = useScroll();

  // the scroll fraction at which this checkpoint is centered
  const center = COUNT > 1 ? index / (COUNT - 1) : 0;

  useFrame((state, delta) => {
    // visibility ramps up as the global offset nears this checkpoint
    const dist = Math.abs(scroll.offset - center);
    const focus = THREE.MathUtils.clamp(1 - dist * (COUNT - 1) * 1.4, 0, 1);

    if (!reducedMotion) {
      ring.current.rotation.z += delta * 0.15;
      core.current.rotation.x += delta * 0.4;
      core.current.rotation.y += delta * 0.25;
    }

    const s = 0.6 + focus * 0.7;
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, s, 4, delta));
    core.current.material.emissiveIntensity = THREE.MathUtils.damp(
      core.current.material.emissiveIntensity,
      0.2 + focus * 1.8,
      4,
      delta
    );
    ring.current.material.opacity = THREE.MathUtils.damp(
      ring.current.material.opacity,
      0.1 + focus * 0.6,
      4,
      delta
    );
  });

  return (
    <group ref={group} position={position}>
      <mesh ref={ring} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[3.4, 0.02, 16, 120]} />
        <meshBasicMaterial color="#6d8bff" transparent opacity={0.2} />
      </mesh>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color="#0b0d18"
          emissive="#6d8bff"
          emissiveIntensity={0.3}
          metalness={0.6}
          roughness={0.25}
          flatShading
        />
      </mesh>
    </group>
  );
}
