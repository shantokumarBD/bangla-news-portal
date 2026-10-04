import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface MarqueeType {
  id: string;
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
  type: string;
  isLive: boolean;
  firstPublished: string;
  lastPublished: string;
  source: string;
}

const getNewsMarquee = async (): Promise<{ data: MarqueeType[] }> => {
  try {
    const res = await fetch("https://news-api-v2.vercel.app/api/news");
    return res.json();
  } catch (error) {
    throw new Error("Failed Data load");
  }
};

const Marquee = async () => {
  const { data } = await getNewsMarquee();
  // console.log(data);

  return (
    <div className="mt-5 bg-gradient-brand text-white">
      <div className="flex items-center max-w-7xl mx-auto px-6">
        <div><h3 className="text-white bg-red-700 px-3 py-2">সর্বশেষ</h3></div>
        <MarqueeText direction="right" duration={10}>
          {data?.map((m) => (
            <span key={m.id}>
              <span>{m.title}</span>
              <span className="mx-5">•</span>
            </span>
          ))}
        </MarqueeText>
      </div>
    </div>
  );
};

export default Marquee;
