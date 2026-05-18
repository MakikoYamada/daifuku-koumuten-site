/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** お問い合わせフォームの送信先 (Google Apps Script Web App の URL) */
  readonly VITE_CONTACT_ENDPOINT: string;
  /** Cloudflare Turnstile のサイトキー (公開鍵。未設定なら Turnstile 無効) */
  readonly VITE_TURNSTILE_SITE_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface TurnstileRenderOptions {
  sitekey: string;
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
}

interface Window {
  turnstile?: {
    render: (el: HTMLElement, opts: TurnstileRenderOptions) => string;
    reset: (id?: string) => void;
    remove: (id?: string) => void;
  };
}
