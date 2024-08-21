import { getAllTopics, getTopicsByCategory } from "@/api/api";
import TopicsList from "@/app/components/TopicsList";
import { ISubcategory, ICategory } from "@/types/topics";
import NavDrawerContent from "@/app/components/NavDrawerContent";
import Header from "@/app/components/Header";

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const allData: ICategory = await getAllTopics();
  const categories = Object.entries(allData).map(([name, subcategories]) => ({
    name,
    subcategories: Object.keys(subcategories),
  }));
  const data: ISubcategory = await getTopicsByCategory(params.category);

  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="container drawer-content min-h-screen">
          <Header params={params.category} />
          <main>
            <TopicsList data={{ [params.category]: data }} />
          </main>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
            <NavDrawerContent categories={categories} />
          </div>
        </div>
      </div>
    </>
  );
}
