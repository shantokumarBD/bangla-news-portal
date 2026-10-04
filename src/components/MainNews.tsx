import Image from "next/image";
import { SectionData } from "./Home";

interface MainNewsType {
  news: SectionData["articles"];
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

const MainNews = ({ news }: MainNewsType) => {
  const [firstNews, ...othersNews] = news;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="card w-full bg-base-100 shadow-sm border border-gray-100">
        <figure className="w-full">
          <Image
            src={firstNews.imageUrl}
            alt={firstNews.imageAlt}
            width={600}
            height={400}
            className="w-full h-auto object-cover hover:scale-105 duration-300"
          ></Image>
        </figure>
        <div className="card-body">
        <p className="font-semibold text-red-600">{firstNews.category}</p>
          <h2 className="card-title text-xl md:text-2xl hover:text-red-600 transition-colors cursor-pointer">{firstNews.title}</h2>
          <p className="text-gray-600 line-clamp-3">{firstNews.description}</p>
          <h4 className="text-gray-500 text-sm mt-2">
            {formatBanglaDate(firstNews.firstPublished)}
          </h4>
        </div>
      </div>
      <div className="w-full bg-white border border-gray-300 rounded-lg ">
        <div>
          {othersNews.slice(0, 4).map((o) => (
            <div className="border-b border-gray-300 p-5" key={o.id}>
                <p className="font-semibold text-red-600">{o.category}</p>
                <h2>{o.title}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainNews;
