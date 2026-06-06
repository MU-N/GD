import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

// Soft bloom on the emissive accents + a vignette to frame the minimal world.
export default function Effects() {
  return (
    <EffectComposer disableNormalPass>
      <Bloom
        intensity={0.9}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.4}
        mipmapBlur
      />
      <Vignette eskil={false} offset={0.3} darkness={0.85} />
    </EffectComposer>
  );
}
