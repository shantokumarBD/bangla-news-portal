import MainNews from "./MainNews";
import OtherNewsSection from "./OtherNewsSection";

export interface SectionData {
  title: string;
  curationId: string;
  curationType: string;
  link: string | null;
  count: number;
  articles: {
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
  }[];
}

const getHomePage = async (): Promise<{ data: SectionData[] }> => {
  try {
    const res = await fetch('https://news-api-v2.vercel.app/api/news/sections', {
      next: { revalidate: 3600 } 
    });
    if (!res.ok) throw new Error("Failed Data Load");
    return res.json();
  } catch (error) {
    throw new Error("Failed Data Load");
  }
};

const Home = async () => {
  const { data } = await getHomePage();
  // console.log("First Secton Articles", data[0]?.articles[0]);
  
  console.log(data);

  const otherNews = data.slice(1)
  console.log(otherNews);
  
  

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
        <div className="lg:col-span-2">
            <MainNews news={data[0].articles}></MainNews>
            <OtherNewsSection otherNews={otherNews}></OtherNewsSection>
        </div>
        <div className="lg:col-span-1 bg-green-500 rounded-lg h-fit min-h-[300px]">o</div>
      </div>
    </div>
  );
};

export default Home;
