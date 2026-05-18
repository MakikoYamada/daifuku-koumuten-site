import { useEffect, useRef, useState } from "react";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT;
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

const initialForm = {
  name: "",
  furigana: "",
  email: "",
  phone: "",
  category: "",
  message: "",
  // ハニーポット: 画面に表示されない項目。Bot が埋めたらサーバ側で破棄する。
  company: "",
};

const ContactSection = () => {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  // Cloudflare Turnstile ウィジェットの読み込み・描画
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;

    // 完了画面ではフォームが消えるのでウィジェットを破棄し、
    // 「続けてお問い合わせ」で戻ったとき再生成できるようにする
    if (status === "success") {
      if (window.turnstile && widgetIdRef.current) {
        window.turnstile.remove(widgetIdRef.current);
      }
      widgetIdRef.current = null;
      setTurnstileToken("");
      return;
    }

    const renderWidget = () => {
      if (!turnstileRef.current || widgetIdRef.current || !window.turnstile) return;
      widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token) => setTurnstileToken(token),
        "expired-callback": () => setTurnstileToken(""),
        "error-callback": () => setTurnstileToken(""),
      });
    };

    if (window.turnstile) {
      renderWidget();
      return;
    }

    let timer: number | undefined;
    if (!document.querySelector("script[data-turnstile]")) {
      const s = document.createElement("script");
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      s.async = true;
      s.defer = true;
      s.setAttribute("data-turnstile", "");
      s.onload = renderWidget;
      document.head.appendChild(s);
    } else {
      timer = window.setInterval(() => {
        if (window.turnstile) {
          window.clearInterval(timer);
          renderWidget();
        }
      }, 200);
    }
    return () => {
      if (timer) window.clearInterval(timer);
    };
  }, [status]);

  const resetTurnstile = () => {
    setTurnstileToken("");
    if (window.turnstile && widgetIdRef.current) {
      window.turnstile.reset(widgetIdRef.current);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    if (!CONTACT_ENDPOINT) {
      setStatus("error");
      setErrorMessage(
        "送信先が設定されていません。お手数ですがお電話にてお問い合わせください。"
      );
      return;
    }

    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setStatus("error");
      setErrorMessage(
        "認証を完了してください（少し待つと認証欄が表示されます）。"
      );
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      // Content-Type を text/plain にして CORS プリフライト(OPTIONS)を回避する。
      // GAS 側は本文を JSON.parse して処理する。
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          ...formData,
          "cf-turnstile-response": turnstileToken,
        }),
      });
      const data = await res.json();

      if (data.result === "ok") {
        setStatus("success");
        setFormData(initialForm);
        resetTurnstile();
      } else {
        setStatus("error");
        setErrorMessage(
          data.message || "送信に失敗しました。時間をおいて再度お試しください。"
        );
        resetTurnstile(); // Turnstile トークンは使い切りなので再認証させる
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        "送信に失敗しました。通信環境をご確認のうえ、再度お試しください。"
      );
      resetTurnstile();
    }
  };

  const isSubmitting = status === "submitting";

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

        {status === "success" ? (
          /* Success */
          <div className="bg-white rounded-lg p-10 text-center shadow-sm">
            <p className="text-2xl font-bold text-[#1F3A5F] mb-4">
              お問い合わせありがとうございます
            </p>
            <p className="text-gray-600 mb-8">
              内容を確認の上、担当者よりご連絡いたします。
              <br />
              今しばらくお待ちくださいませ。
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="px-8 py-3 border border-[#1F3A5F] text-[#1F3A5F] hover:bg-[#1F3A5F] hover:text-white font-medium rounded transition-colors duration-300"
            >
              続けてお問い合わせする
            </button>
          </div>
        ) : (
          /* Contact Form */
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

            {/* Honeypot: スパム対策。人間には見えない。 */}
            <div
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
            >
              <label htmlFor="company">会社名（入力しないでください）</label>
              <input
                type="text"
                id="company"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                value={formData.company}
                onChange={handleChange}
              />
            </div>

            {/* Turnstile (スパム対策) */}
            {TURNSTILE_SITE_KEY && (
              <div className="flex justify-center pt-2">
                <div ref={turnstileRef} />
              </div>
            )}

            {/* Error message */}
            {status === "error" && (
              <p className="text-center text-red-600 text-sm">{errorMessage}</p>
            )}

            {/* Submit */}
            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-12 py-4 bg-[#1F3A5F] hover:bg-[#162d4a] text-white font-medium rounded transition-colors duration-300 text-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "送信中..." : "送信する"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default ContactSection;
