"use client";

export default function Banner() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/HeroBackground.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for darker effect */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white text-center max-w-4xl">
          <span className="text-amber-400">Limitless,</span>
          <span className="block">Together</span>
        </h1>
      </div>
    </section>
  );
}
