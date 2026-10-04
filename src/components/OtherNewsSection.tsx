import React from "react";
import { SectionData } from "./Home";
import Image from "next/image";
import NewsCard from "./NewsCard";

interface OtherNewsType {
  otherNews: SectionData[];
}

const OtherNewsSection = ({ otherNews }: OtherNewsType) => {
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

  return (
    <div className="mt-10">
      <div>
        {otherNews?.map((otn) => (
          <div className="" key={otn.curationId}>
            <h1 className="font-semibold text-xl py-2 border-b-2 border-red-700">
              {otn.title}
            </h1>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
              {otn.articles.map((ar) => (
                <NewsCard key={ar.id} article={ar} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherNewsSection;
