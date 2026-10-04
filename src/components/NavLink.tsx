import Link from "next/link";
import React from "react";


interface CategoryType{
    slug: string
    title: string
    topicId: string | null
    url: string 
    scrapable: boolean
}

const getNavLinkCategories = async (): Promise<{ data: CategoryType[] }> => {
  try {
    const res = await fetch("https://news-api-v2.vercel.app/api/categories");
    if (!res.ok) {
      console.error(`API Error in NavLink: ${res.status}`);
      return { data: [] };
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed data load:", error);
    return { data: [] };
  }
};

const NavLink = async () => {
  const { data } = await getNavLinkCategories();

  return (
    <div className="max-w-7xl mx-auto">

    <div className="flex items-center justify-center gap-5 mt-5">
        <Link href={'/'}>হোম</Link>
      {data?.filter((f)=> f.scrapable).map((navitems , i: number) => (
        <Link key={i} href={`/category/${navitems.slug}`}>
          {navitems.title}
        </Link>
      ))}
    </div>
    </div>
  );
};

export default NavLink;
