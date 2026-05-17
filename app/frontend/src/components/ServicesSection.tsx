const services = [
  {
    title: "新築工事",
    description:
      "京都の風土に合った木造住宅を、伝統工法と最新技術を融合させて建築いたします。自然素材にこだわり、家族が安心して暮らせる住まいをご提供します。",
    image:
      "https://mgx-backend-cdn.metadl.com/generate/images/1185015/2026-05-14/orwnrpiaagnq/service-new-construction-wooden-house.png",
  },
  {
    title: "リフォーム・リノベーション",
    description:
      "築年数の経った住まいを、現代の暮らしに合わせて生まれ変わらせます。京町家の改修から水回りリフォームまで、幅広く対応いたします。",
    image:
      "https://mgx-backend-cdn.metadl.com/generate/images/1185015/2026-05-14/orwnu7iaagqq/service-renovation-machiya-interior.png",
  },
  {
    title: "修繕・メンテナンス",
    description:
      "屋根の補修、外壁の塗り替え、シロアリ対策など、住まいの維持管理をトータルでサポート。小さな修繕もお気軽にご相談ください。",
    image:
      "https://mgx-backend-cdn.metadl.com/generate/images/1185015/2026-05-14/orwnqmyaagqa/service-repair-roof-tiles.png",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 md:py-28 bg-[#FAFAF7]">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1F3A5F] text-center mb-14">
          事業内容
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#1F3A5F] mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;