import React from 'react';
import NewsCard, { Article } from '../../../components/NewsCard';

interface PageProps {
  params: Promise<{ categoryId: string }>;
}

const DynamicCategorypage = async ({ params }: PageProps) => {
  const { categoryId } = await params;
  
  const res = await fetch(`https://news-api-v2.vercel.app/api/category/${categoryId}`);
  
  const data = await res.json();

  const categoryNews = data.data;

  console.log(categoryNews);
  

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 mb-10">
      <h1 className="text-2xl font-bold mt-8 mb-6 pb-2 border-b-2 border-red-700 uppercase">
        {categoryId}
      </h1>
      <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5'>
          {categoryNews && categoryNews.length > 0 ? (
            categoryNews.map((news: Article) => (
              <NewsCard key={news.id} article={news} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-gray-500 text-lg">
              এই ক্যাটাগরিতে কোনো খবর পাওয়া যায়নি।
            </div>
          )}
      </div>
    </div>
  );
};

export default DynamicCategorypage;