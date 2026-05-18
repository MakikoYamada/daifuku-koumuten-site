/**
 * 全リクエストに Basic 認証をかける Cloudflare Pages ミドルウェア。
 * クライアント承認前の非公開用。
 *
 * パスワードはリポジトリに置かず、Cloudflare Pages の環境変数で設定する:
 *   BASIC_AUTH_USER  ... ユーザー名
 *   BASIC_AUTH_PASS  ... パスワード
 * (Pages → プロジェクト → Settings → Environment variables (Production) に追加)
 *
 * 環境変数が未設定なら「fail closed」= 全拒否（誤って公開されるのを防ぐ）。
 * 検索避けとして X-Robots-Tag: noindex も全レスポンスに付与する。
 */

const NOINDEX = "noindex, nofollow";

function unauthorized() {
  return new Response("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Restricted", charset="UTF-8"',
      "X-Robots-Tag": NOINDEX,
      "Cache-Control": "no-store",
    },
  });
}

export const onRequest = async (context) => {
  const { request, env, next } = context;

  const USER = env.BASIC_AUTH_USER;
  const PASS = env.BASIC_AUTH_PASS;

  // 認証情報が未設定なら公開しない（fail closed）
  if (!USER || !PASS) {
    return new Response(
      "Basic auth is not configured (set BASIC_AUTH_USER / BASIC_AUTH_PASS).",
      { status: 503, headers: { "X-Robots-Tag": NOINDEX, "Cache-Control": "no-store" } }
    );
  }

  const header = request.headers.get("Authorization") || "";
  const [scheme, encoded] = header.split(" ");

  if (scheme === "Basic" && encoded) {
    // UTF-8 を正しく扱えるようデコード
    const bytes = Uint8Array.from(atob(encoded), (c) => c.charCodeAt(0));
    const decoded = new TextDecoder().decode(bytes);
    const sep = decoded.indexOf(":");
    const user = decoded.slice(0, sep);
    const pass = decoded.slice(sep + 1);

    if (user === USER && pass === PASS) {
      const response = await next();
      // 認証済みでも検索エンジンにインデックスさせない
      const r = new Response(response.body, response);
      r.headers.set("X-Robots-Tag", NOINDEX);
      return r;
    }
  }

  return unauthorized();
};
