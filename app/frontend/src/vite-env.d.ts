/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** お問い合わせフォームの送信先 (Google Apps Script Web App の URL) */
  readonly VITE_CONTACT_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
