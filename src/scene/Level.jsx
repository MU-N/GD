import { useMemo } from "react";
import * as THREE from "three";
import { Stars } from "@react-three/drei";
import Checkpoint from "./Checkpoint.jsx";
import { anchors, SECTION_GAP, COUNT } from "./layout.js";

// The static abstract "level": a path line threading the checkpoints, a faint
// grid floor for depth, scattered minimal geometry, and the checkpoints.
export default function Level({ reducedMotion }) {
  // smooth curve through the section anchors -> a guide line down the level
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        anchors.map((a) => new THREE.Vector3(a.x, a.y, a.z))
      ),
    []
  );

  const tubeGeo = useMemo(
    () => new THREE.TubeGeometry(curve, 200, 0.015, 8, false),
    [curve]
  );

  // a handful of slowly drifting wireframe shapes scattered alongside the path
  const debris = useMemo(() => {
    const rng = mulberry32(42);
    return Array.from({ length: 26 }, () => {
      const t = rng();
      const onPath = curve.getPoint(t);
      return {
        position: [
          onPath.x + (rng() - 0.5) * 22,
          (rng() - 0.5) * 14,
          onPath.z + (rng() - 0.5) * 10,
        ],
        rotation: [rng() * Math.PI, rng() * Math.PI, rng() * Math.PI],
        scale: 0.3 + rng() * 1.1,
        kind: Math.floor(rng() * 3),
      };
    });
  }, [curve]);

  return (
    <group>
      <Stars radius={120} depth={60} count={1600} factor={3} saturation={0} fade speed={reducedMotion ? 0 : 0.4} />

      {/* path guide line */}
      <mesh geometry={tubeGeo}>
        <meshBasicMaterial color="#6d8bff" transparent opacity={0.35} />
      </mesh>

      {/* grid floor far below for a sense of place */}
      <gridHelper
        args={[400, 120, "#1a2140", "#11152a"]}
        position={[0, -7, -((COUNT - 1) * SECTION_GAP) / 2]}
      />

      {anchors.map((a, i) => (
        <Checkpoint
          key={a.id}
          index={i}
          position={[a.x, a.y, a.z]}
          reducedMotion={reducedMotion}
        />
      ))}

      {debris.map((d, i) => (
        <mesh key={i} position={d.position} rotation={d.rotation} scale={d.scale}>
          {d.kind === 0 && <octahedronGeometry args={[1, 0]} />}
          {d.kind === 1 && <tetrahedronGeometry args={[1, 0]} />}
          {d.kind === 2 && <boxGeometry args={[1, 1, 1]} />}
          <meshBasicMaterial color="#2b3566" wireframe transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

// tiny deterministic PRNG so the debris layout is stable across reloads
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
