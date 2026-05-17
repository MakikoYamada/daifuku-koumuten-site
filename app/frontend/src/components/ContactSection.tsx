import { useState } from "react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    furigana: "",
    email: "",
    phone: "",
    category: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("お問い合わせありがとうございます。内容を確認の上、担当者よりご連絡いたします。");
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#FAFAF7]">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1F3A5F] text-center mb-6">
          お問い合わせ
        </h2>
        <p className="text-center text-gray-600 mb-12">
          住まいに関するご相談・お見積りは無料です。お気軽にお問い合わせください。
        </p>

        {/* Phone Contact */}
        <div className="bg-white rounded-lg p-6 mb-10 text-center shadow-sm">
          <p className="text-gray-600 mb-2">お電話でのお問い合わせ</p>
          <p className="text-2xl md:text-3xl font-bold text-[#1F3A5F]">
            075-123-4567
          </p>
          <p className="text-sm text-gray-500 mt-2">
            受付時間：平日 9:00〜18:00（土日祝休み）
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#1F3A5F] mb-2">
              お名前 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1F3A5F]/30 focus:border-[#1F3A5F]"
              placeholder="例：大福 太郎"
            />
          </div>

          {/* Furigana */}
          <div>
            <label htmlFor="furigana" className="block text-sm font-medium text-[#1F3A5F] mb-2">
              ふりがな
            </label>
            <input
              type="text"
              id="furigana"
              name="furigana"
              value={formData.furigana}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1F3A5F]/30 focus:border-[#1F3A5F]"
              placeholder="例：だいふく たろう"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#1F3A5F] mb-2">
              メールアドレス <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1F3A5F]/30 focus:border-[#1F3A5F]"
              placeholder="例：info@example.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-[#1F3A5F] mb-2">
              電話番号
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1F3A5F]/30 focus:border-[#1F3A5F]"
              placeholder="例：075-123-4567"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-[#1F3A5F] mb-2">
              お問い合わせ種別 <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1F3A5F]/30 focus:border-[#1F3A5F] bg-white"
            >
              <option value="">選択してください</option>
              <option value="新築">新築のご相談</option>
              <option value="リフォーム">リフォーム・リノベーション</option>
              <option value="修繕">修繕・メンテナンス</option>
              <option value="見積り">お見積り依頼</option>
              <option value="その他">その他</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-[#1F3A5F] mb-2">
              お問い合わせ内容 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1F3A5F]/30 focus:border-[#1F3A5F] resize-vertical"
              placeholder="ご相談内容をご記入ください"
            />
          </div>

          {/* Submit */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="px-12 py-4 bg-[#1F3A5F] hover:bg-[#162d4a] text-white font-medium rounded transition-colors duration-300 text-lg"
            >
              送信する
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;