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

  // Interaction
  draggable?: boolean;
  dragSensitivity?: number;
  inertia?: boolean;
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

  draggable = true,
  dragSensitivity = 0.005,
  inertia = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    let width = 0;

    const onResize = () => {
      width = canvas.offsetWidth;
    };

    onResize();

    window.addEventListener("resize", onResize);

    // Current globe position
    let currentPhi = phi;
    let currentTheta = theta;

    // Drag state
    let isDragging = false;

    let previousX = 0;
    let previousY = 0;

    // Momentum after releasing
    let velocityX = 0;
    let velocityY = 0;

    const handlePointerDown = (event: PointerEvent) => {
      if (!draggable) return;

      isDragging = true;

      previousX = event.clientX;
      previousY = event.clientY;

      velocityX = 0;
      velocityY = 0;

      canvas.setPointerCapture(event.pointerId);
      canvas.style.cursor = "grabbing";
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!draggable || !isDragging) return;

      const deltaX = event.clientX - previousX;
      const deltaY = event.clientY - previousY;

      previousX = event.clientX;
      previousY = event.clientY;

      /*
       * Horizontal drag → longitude
       *
       * Dragging right rotates the globe toward the right.
       */
      const phiDelta = deltaX * dragSensitivity;

      /*
       * Vertical drag → latitude / tilt
       */
      const thetaDelta = deltaY * dragSensitivity;

      currentPhi += phiDelta;
      currentTheta += thetaDelta;

      /*
       * Prevent flipping the globe upside down.
       */
      currentTheta = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, currentTheta),
      );

      // Save velocity for inertia.
      velocityX = phiDelta;
      velocityY = thetaDelta;
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (!draggable) return;

      isDragging = false;

      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }

      canvas.style.cursor = "grab";
    };

    const handlePointerCancel = (event: PointerEvent) => {
      isDragging = false;

      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }

      canvas.style.cursor = "grab";
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointercancel", handlePointerCancel);

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
        /*
         * While the user is dragging:
         * don't auto rotate.
         */
        if (!isDragging) {
          /*
           * Apply momentum from the last drag.
           */
          if (
            inertia &&
            (Math.abs(velocityX) > 0.0001 ||
              Math.abs(velocityY) > 0.0001)
          ) {
            currentPhi += velocityX;
            currentTheta += velocityY;

            // Friction
            velocityX *= 0.94;
            velocityY *= 0.94;

            currentTheta = Math.max(
              -Math.PI / 2,
              Math.min(Math.PI / 2, currentTheta),
            );
          } else {
            /*
             * Normal automatic rotation.
             */
            currentPhi += rotationSpeed;
          }
        }

        state.phi = currentPhi;
        state.theta = currentTheta;
      },
    } as Parameters<typeof createGlobe>[1];

    const globe = createGlobe(canvas, globeOptions);

    return () => {
      window.removeEventListener("resize", onResize);

      canvas.removeEventListener(
        "pointerdown",
        handlePointerDown,
      );

      canvas.removeEventListener(
        "pointermove",
        handlePointerMove,
      );

      canvas.removeEventListener(
        "pointerup",
        handlePointerUp,
      );

      canvas.removeEventListener(
        "pointercancel",
        handlePointerCancel,
      );

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
    draggable,
    dragSensitivity,
    inertia,
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

          // Interaction
          cursor: draggable ? "grab" : "default",
          touchAction: "none",
          userSelect: "none",
        }}
      />
    </div>
  );
};

export default Earth;