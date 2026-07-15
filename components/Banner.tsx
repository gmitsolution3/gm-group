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
        <source src="/images/HeroBackground.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for darker effect */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="absolute bottom-10 lg:bottom-25 left-0 lg:left-50 z-10 h-full px-6 pb-8 flex items-end">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
          Driven by{" "}
          <span className="text-amber-400">Innovation,</span> <br /> United
          by <span className="text-amber-400">Vision</span>
        </h1>
      </div>
    </section>
  );
}
