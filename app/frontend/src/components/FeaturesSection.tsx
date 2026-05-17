const features = [
  {
    number: "01",
    title: "地域密着の信頼",
    description:
      "京都の気候風土を知り尽くした地元の工務店だからこそ、土地に合った最適な住まいづくりが可能です。アフターフォローも迅速に対応いたします。",
  },
  {
    number: "02",
    title: "確かな職人技術",
    description:
      "熟練の大工職人が一棟一棟丁寧に施工。伝統的な木造建築の技術を活かしながら、耐震性・断熱性に優れた住まいを実現します。",
  },
  {
    number: "03",
    title: "丁寧なヒアリング",
    description:
      "お客様のご要望を細部まで伺い、ライフスタイルに寄り添ったプランをご提案。完成後も「建てて良かった」と思っていただける家づくりを目指します。",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 md:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1F3A5F] text-center mb-14">
          大福工務店の3つの強み
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature) => (
            <div key={feature.number} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1F3A5F] text-white text-2xl font-bold mb-5">
                {feature.number}
              </div>
              <h3 className="text-xl font-bold text-[#1F3A5F] mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;