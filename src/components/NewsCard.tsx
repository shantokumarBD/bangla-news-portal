import React from "react";
import Image from "next/image";
import { SectionData } from "./Home";
import Link from "next/link";

export type Article = SectionData["articles"][0];

interface NewsCardProps {
  article: Article;
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

const NewsCard = ({ article }: NewsCardProps) => {
  return (
    <Link href={`/news/${article.id}`}>
      <div className="card w-full bg-base-100 shadow-sm border border-gray-100 h-full">
        <figure className="w-full">
          {article.imageUrl ? (
            <Image
              src={article.imageUrl}
              alt={article.imageAlt || "News image"}
              width={600}
              height={600}
              className="w-full max-w-[600px] max-h-[300px] object-cover hover:scale-105 duration-300"
            />
          ) : (
            <div className="w-full h-[200px] bg-gray-200 animate-pulse"></div>
          )}
        </figure>
        <div className="card-body p-3">
          <p className="font-semibold text-xs text-red-600">
            {article.category}
          </p>
          <h2 className="card-title text-sm font-semibold hover:text-red-600 transition-colors cursor-pointer line-clamp-2">
            {article.title}
          </h2>
          <p className="text-gray-600 line-clamp-3 text-xs">
            {article.description}
          </p>
          <h4 className="text-gray-500 text-xs mt-2">
            {article.firstPublished
              ? formatBanglaDate(article.firstPublished)
              : ""}
          </h4>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
