// lib/fetchData.ts



export async function fetchSheetData(sheetName: string, range: string = 'A2:H') {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;
  const sheetId = process.env.NEXT_PUBLIC_SPREADSHEET_ID;

// 🌟 ここで本当に値が入っているか確認する！
  console.log('API Key:', apiKey); 
  console.log('Sheet ID:', sheetId);
  console.log('URL:', `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!${range}?key=${apiKey}`);

  // Google SheetsのAPIを叩くURL（パッケージ不要で直接アクセス！）
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!${range}?key=${apiKey}`;

try {
    // データを取得（毎回必ず最新を見に行く命令を追加！）
    const res = await fetch(url);
    
    if (!res.ok) {
      console.error('スプレッドシートの読み込みに失敗しました:', res.statusText);
      return [];
    }

    const data = await res.json();
    return data.values || []; // 行の配列（中身）だけを返す
    
  } catch (error) {
    console.error('通信エラー:', error);
    return [];
  }
}
