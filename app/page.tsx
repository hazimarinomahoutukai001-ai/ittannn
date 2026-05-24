import UltimateCommunitySite from './UltimateCommunitySite';
import { fetchSheetData } from './lib/fetchData';

export const metadata = {
  title: 'TSC Official | The Streamer Creator Server',
  description: 'The Streamer Creator Server Official Portal Site',
};

export default async function Page() {
  // 1. スプレッドシートの各タブ（シート）からデータを引っこ抜く！
  const rawNews = await fetchSheetData('news', 'A2:F'); 
  const rawArticles = await fetchSheetData('articles', 'A2:F'); 
  const rawGallery = await fetchSheetData('gallery', 'A2:G');

  // 2. 画面側が使いやすいように、配列をキレイな形（オブジェクト）に整える
  const newsItems = rawNews.map((row: any) => ({
    id: row[0] || '',
    date: row[1] || '',
    category: row[2] || '',
    title: row[3] || '',
    content: row[4] || '',
    articleId: row[5] || null,
  }));

  const articleItems = rawArticles.map((row: any) => ({
    id: row[0] || '',
    category: row[1] || '',
    date: row[2] || '',
    title: row[3] || '',
    thumbnail: row[4] || '',
    content: row[5] || '',
  }));

  const galleryItems = rawGallery.map((row: any) => ({
    id: row[0] || '',
    image: row[1] || '',
    date: row[2] || '',
    title: row[3] || '',
    category: row[4] || '',
    description: row[5] || '',
    articleId: row[6] || null,
  }));

  // 3. 準備できたデータを「主役（UltimateCommunitySite）」にドカンと渡す！
  return (
    <UltimateCommunitySite 
      dynamicNews={newsItems} 
      dynamicArticles={articleItems} 
      dynamicGallery={galleryItems} 
    />
  );
}
