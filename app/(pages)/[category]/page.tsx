import { getAllTopics, getTopicsByCategory } from "@/app/api/api";
import TopicsList from "@/app/components/TopicsList";
import { ISubcategory, ICategory } from "@/types/topics";
import NavDrawerContent from "@/app/components/NavDrawerContent";
import Header from "@/app/components/Header";

export const runtime = 'edge';
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
  const pathname = `${params.category}`;

  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="main-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content h-screen p-2 lg:p-4">
          <div className="card h-full bg-base-100">
            <div className="card-body h-full p-0">
              <span className="px-6 py-4">
                <Header params={params.category} pathname={pathname} />
              </span>
              <main className="mb-2 mr-2 overflow-y-auto p-6 pb-4 pr-4">
                <TopicsList data={{ [params.category]: data }} />
              </main>
            </div>
          </div>
        </div>

        <div className="drawer-side z-20">
          <label
            htmlFor="main-drawer"
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
