import React from 'react';

export interface MostReadArticle {
  id: string;
  title: string;
  description: string | null;
  link: string;
  imageUrl: string | null;
  imageAlt: string | null;
  category: string;
  type: string;
  isLive: boolean;
  firstPublished: string;
  lastPublished: string | null;
  source: string;
  rank: number;
}

const getMostRead = async (): Promise<{ data: MostReadArticle[] }> => {
  try {
    const res = await fetch('https://news-api-v2.vercel.app/api/news/most-read', {
      next: { revalidate: 3600 } 
    });
    if (!res.ok) throw new Error("Failed Data Load");
    return res.json();
  } catch (error) {
    throw new Error("Failed Data Load");
  }
};

const MostRead = async () => {
  const { data } = await getMostRead();

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm h-full">
      <h2 className="text-xl font-bold mb-4 border-b-2 border-red-700 pb-2">সর্বাধিক পঠিত</h2>
      <div className="flex flex-col gap-4">
        {data?.map((news) => (
          <div key={news.id} className="flex gap-4 items-start border-b border-gray-100 pb-4 last:border-0 last:pb-0">
            <span className="text-4xl font-black text-gray-200">
              {news.rank}
            </span>
            <div>
              <h3 className="text-sm font-semibold hover:text-red-600 transition-colors cursor-pointer">
                {news.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostRead;