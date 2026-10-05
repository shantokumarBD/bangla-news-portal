import React from 'react'
import Image from 'next/image'
import ArticleRenderer, { extractText } from '../../../components/ArticleRenderer';

interface PageProps {
  params: Promise<{ newsId: string }>;
}

const formatBanglaDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
};

const NewsDetailsPage = async({params}: PageProps) => {
  const {newsId} = await params

  let article = null;
  try {
    const res = await fetch(`https://news-api-v2.vercel.app/api/article/${newsId}`);
    if (res.ok) {
      const data = await res.json();
      article = data.data;
    }
  } catch(error) {
    console.error("Failed to fetch article details:", error);
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-xl text-gray-500">
        খবরটি পাওয়া যায়নি।
      </div>
    );
  }

  const descriptionText = extractText(article.description);

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 mt-10 mb-20">
      <article className="w-full">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-gray-900 leading-[1.4] mb-4">
          {article.title}
        </h1>

        {/* Subtitle / Description (acts as an excerpt) */}
        {descriptionText && (
          <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed mb-6">
            {descriptionText}
          </p>
        )}

        {/* Author and Date */}
        <div className="text-sm text-gray-500 mb-6 pb-4 border-b border-gray-200">
          <span className="font-semibold text-gray-700">{article.source || "ডেস্ক রিপোর্ট"}</span>
          <span className="mx-2">|</span>
          <span>{article.firstPublished ? `আপডেট: ${formatBanglaDate(article.firstPublished)}` : "সময় উল্লেখ নেই"}</span>
        </div>

        {/* Main Featured Image */}
        {article.imageUrl && (
          <div className="mb-10 w-full">
            <Image 
              src={article.imageUrl} 
              alt={article.imageAlt || article.title}
              width={1000}
              height={600}
              className="w-full h-auto max-h-[600px] object-cover rounded-md"
              priority
            />
            {article.imageAlt && (
              <p className="text-left text-sm text-gray-500 mt-2">{article.imageAlt}</p>
            )}
          </div>
        )}

        {/* Article Body */}
        <div className="prose prose-lg max-w-none text-gray-800 prose-p:leading-[1.8] prose-p:text-[18px] md:prose-p:text-[20px] prose-a:text-red-600 mb-10 prose-img:rounded-md prose-img:w-full">
          <ArticleRenderer content={article.body || article.description} />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 border-t border-gray-200 pt-6 mt-10">
          <span className="text-gray-500 font-semibold mr-2">ট্যাগ:</span>
          {article.category && (
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors cursor-pointer">
              {article.category}
            </span>
          )}
          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors cursor-pointer">
            সংবাদ
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors cursor-pointer">
            বাংলাদেশ
          </span>
        </div>
      </article>
    </div>
  )
}

export default NewsDetailsPage