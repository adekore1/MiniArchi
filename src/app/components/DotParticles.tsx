// components/DotParticlesBg.tsx
"use client";
import { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default function DotParticlesBg() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log("✅ Particles loaded", container);
  };

  const options: ISourceOptions = useMemo(() => ({
    background: {
      color: { value: "#191919" }
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: { enable: true, mode: ["push"] },
        onHover: { enable: true, mode: ["grab","repulse"] }
      },
      modes: {
        push: { quantity: 6 },
        bubble: {distance: 90, size: 10, duration: 0.5, opacity: 0.5, color:{value: "#7769b4"}},
        grab: {distance: 130, links:{opacity: 0.5},},
        repulse: { distance: 50, duration: 0.4 }
      }
    },
    size:{
      // value:{min:1,max:70}, 
      animation: {enable: true, speed: 3, minimumValue: 1, sync: false}
    },
    particles: {
      color: { value: "#ffffff" },
      links: {
        color: "#9BA0C4",
        distance: 50,
        enable: true,
        opacity: 0.6,
        width: 0.6
      },
      move: {
        enable: true,
        speed: 0.3,
        direction: "none",
        outModes: { default: "destroy" }
      },
      number: {
        value: 500,
        density: { enable: true }
      },
      opacity: {
        value:0.5, 
        animation: {
          enable: true, 
          speed:15, 
          minimumValue: 0.1, 
          sync:false
        } 
      },
      rotate:{
        value:0,
        animation: {enable:true, speed:5, sync:false}
      },
      wobble: {
        enable: true,
        distance:5,
        speed:3
      },
      shape: { type: "square" },
      size: { value: { min: 1, max: 5 }, animation:{enable:true, speed:3, minimumValue:1, sync:false} }
    },
    detectRetina: true
  }), []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      options={options}
    />
  );
}
