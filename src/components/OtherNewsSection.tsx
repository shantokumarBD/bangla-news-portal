import React from "react";
import { SectionData } from "./Home";
import Image from "next/image";

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
                <div className="" key={ar.id}>
                  <div className="card w-full bg-base-100 shadow-sm border border-gray-100">
                    <figure className="w-full">
                      <Image
                        src={ar.imageUrl}
                        alt={ar.imageAlt}
                        width={600}
                        height={600}
                        className="w-full
                        max-w-[600px]
                        max-h-[300px]
                        object-cover hover:scale-105 duration-300"
                      ></Image>
                    </figure>
                    <div className="card-body p-3">
                      <p className=" font-semibold text-xs text-red-600">
                        {ar.category}
                      </p>
                      <h2 className="card-title text-sm font-semibold hover:text-red-600 transition-colors cursor-pointer line-clamp-2">
                        {ar.title}
                      </h2>
                      <p className="text-gray-600 line-clamp-3 text-xs">
                        {ar.description}
                      </p>
                      <h4 className="text-gray-500 text-xs mt-2">
                        {formatBanglaDate(ar.firstPublished)}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherNewsSection;
