import { Star } from "lucide-react";

const reviews = [
  {
    name: "山田 太郎 様（京都市左京区）",
    rating: 5,
    text: "家族4人で暮らす新居を建てていただきました。打ち合わせの段階から私たちの要望を丁寧に聞いてくださり、木の香りが心地よい理想の住まいが完成しました。子どもたちも毎日楽しそうに過ごしています。",
  },
  {
    name: "佐藤 花子 様（京都市伏見区）",
    rating: 4,
    text: "築40年の実家をリフォームしていただきました。古い家の良さを残しながら、水回りや断熱をしっかり改善してくださり、冬も暖かく快適に過ごせるようになりました。職人さんの丁寧な仕事ぶりに感動しました。",
  },
];

const VoiceSection = () => {
  return (
    <section id="voice" className="py-20 md:py-28 bg-[#FAFAF7]">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1F3A5F] text-center mb-14">
          お客様の声
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-white p-8 rounded-lg shadow-sm"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating
                        ? "fill-[#D4A853] text-[#D4A853]"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-5 text-sm">
                {review.text}
              </p>
              <p className="text-[#1F3A5F] font-medium text-sm">
                {review.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VoiceSection;