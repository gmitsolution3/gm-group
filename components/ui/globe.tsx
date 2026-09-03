"use client";

import { cn } from "@/lib/utils";
import createGlobe from "cobe";
import type React from "react";
import { useEffect, useRef } from "react";

export type GlobeMarker = {
  location: [number, number];
  size?: number;
};

interface EarthProps {
  className?: string;
  theta?: number;
  phi?: number;
  dark?: number;
  scale?: number;
  diffuse?: number;
  mapSamples?: number;
  mapBrightness?: number;
  baseColor?: [number, number, number];
  markerColor?: [number, number, number];
  glowColor?: [number, number, number];
  markers?: GlobeMarker[];
  rotationSpeed?: number;
}

const Earth: React.FC<EarthProps> = ({
  className,
  theta = 0.25,
  phi = 0,
  dark = 0,
  scale = 1.1,
  diffuse = 1.2,
  mapSamples = 40000,
  mapBrightness = 6,
  baseColor = [1, 1, 1],
  markerColor = [0.31, 0.4, 0.85],
  glowColor = [1, 1, 1],
  markers = [],
  rotationSpeed = 0.0015,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    let width = 0;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };

    onResize();

    window.addEventListener("resize", onResize);

    let currentPhi = phi;

    const globeOptions = {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,

      phi,
      theta,

      dark,
      scale,
      diffuse,

      mapSamples,
      mapBrightness,

      baseColor,
      markerColor,
      glowColor,

      opacity: 1,
      offset: [0, 0],

      markers: markers.map((marker) => ({
        location: marker.location,
        size: marker.size ?? 0.08,
      })),

      onRender: (state: Record<string, unknown>) => {
        state.phi = currentPhi;
        currentPhi += rotationSpeed;
      },
    } as Parameters<typeof createGlobe>[1];

    const globe = createGlobe(canvas, globeOptions);

    return () => {
      window.removeEventListener("resize", onResize);
      globe.destroy();
    };
  }, [
    theta,
    phi,
    dark,
    scale,
    diffuse,
    mapSamples,
    mapBrightness,
    baseColor,
    markerColor,
    glowColor,
    markers,
    rotationSpeed,
  ]);

  return (
    <div
      className={cn(
        "relative z-10 flex w-full items-center justify-center",
        className,
      )}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "100%",
          aspectRatio: "1",
        }}
      />
    </div>
  );
};

export default Earth;