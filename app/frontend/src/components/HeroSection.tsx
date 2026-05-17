const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://mgx-backend-cdn.metadl.com/generate/images/1185015/2026-05-14/orwnvoiaagoq/hero-kyoto-machiya-wooden-house.png')`,
        }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#1F3A5F]/70" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          京都の住まいを、木の温もりとともに。
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed">
          創業以来、地域に根ざした家づくりを続けてきました。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-[#D4A853] hover:bg-[#8B6914] text-white font-medium rounded transition-colors duration-300 text-lg"
          >
            お問い合わせ
          </a>
          <a
            href="#services"
            className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium rounded transition-colors duration-300 text-lg"
          >
            事業内容を見る
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;