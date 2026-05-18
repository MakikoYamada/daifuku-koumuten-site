/**
 * 大福工務店 お問い合わせフォーム バックエンド (Google Apps Script Web App)
 *
 * 役割:
 *   1. フロント(ContactSection.tsx)から送られた内容をスプレッドシートに1行追記
 *   2. 担当者へ通知メールを送信 (MailApp)
 *
 * デプロイ方法は同ディレクトリの README.md を参照してください。
 *
 * 注意: フロントは CORS プリフライトを避けるため Content-Type: text/plain で
 *       送信し、本文に JSON を入れています。ここで JSON.parse します。
 */

// ===== 設定 =====
var NOTIFY_TO = 'makiporigon@gmail.com'; // 通知メールの宛先
var SHEET_NAME = 'お問い合わせ';          // 記録先シート名 (無ければ先頭シートを使用)

/** お問い合わせ受信 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonOutput({ result: 'error', message: '空のリクエストです。' });
    }

    var data = JSON.parse(e.postData.contents);

    // --- スパム対策: ハニーポット ---
    // 画面に表示されない "company" 項目。Bot が入力したら静かに成功扱いで破棄。
    if (data.company) {
      return jsonOutput({ result: 'ok' });
    }

    // --- 必須項目チェック ---
    var name = trimStr(data.name);
    var email = trimStr(data.email);
    var category = trimStr(data.category);
    var message = trimStr(data.message);
    if (!name || !email || !category || !message) {
      return jsonOutput({ result: 'error', message: '必須項目が未入力です。' });
    }

    var furigana = trimStr(data.furigana);
    var phone = trimStr(data.phone);
    var now = new Date();

    // --- スプレッドシートに追記 ---
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.getActiveSheet();
    sheet.appendRow([now, name, furigana, email, phone, category, message]);

    // --- 通知メール送信 ---
    var subject = '【お問い合わせ】' + category + ' / ' + name + ' 様';
    var body =
      '大福工務店サイトよりお問い合わせがありました。\n\n' +
      '受信日時: ' + Utilities.formatDate(now, 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss') + '\n' +
      'お名前　: ' + name + '\n' +
      'ふりがな: ' + furigana + '\n' +
      'メール　: ' + email + '\n' +
      '電話番号: ' + phone + '\n' +
      '種別　　: ' + category + '\n' +
      '----------------------------------------\n' +
      message + '\n' +
      '----------------------------------------\n';
    MailApp.sendEmail({
      to: NOTIFY_TO,
      subject: subject,
      body: body,
      replyTo: email, // 返信するとお客様へ直接届く
    });

    return jsonOutput({ result: 'ok' });
  } catch (err) {
    return jsonOutput({ result: 'error', message: String(err) });
  }
}

/** ブラウザで URL を開いたときの疎通確認用 */
function doGet() {
  return jsonOutput({ result: 'ok', message: 'Contact endpoint is running.' });
}

function trimStr(v) {
  return String(v == null ? '' : v).trim();
}

function jsonOutput(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
