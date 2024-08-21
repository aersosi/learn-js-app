import { getAllTopics, getTopicsByCategory } from "@/api/api";
import TopicsList from "@/app/components/TopicsList";
import ThemeSwitch from "@/app/components/ThemeSwitch";
import { ISubcategory, ICategory } from "@/types/topics";
import NavContent from "@/app/components/NavContent";

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
          <header className="flex justify-between gap-4 py-8">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              Open drawer
            </label>
            <h1 className="text-2xl font-bold">{params.category}</h1>
            <ThemeSwitch />
          </header>
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
            <NavContent categories={categories} />
          </div>
        </div>
      </div>
    </>
  );
}
