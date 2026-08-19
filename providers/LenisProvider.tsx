"use client";

import { ReactLenis } from "lenis/react";

type LenisProviderProps = {
  children: React.ReactNode;
};

export default function LenisProvider({
  children,
}: LenisProviderProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        smoothWheel: true,
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
