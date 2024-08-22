import { getAllTopics } from "@/app/api/api";
import { ICategory } from "@/types/topics";
import NavDrawerContent from "@/app/components/NavDrawerContent";
import Header from "@/app/components/Header";

export default async function Home() {
  const data: ICategory = await getAllTopics();
  const categories = Object.entries(data).map(([name, subcategories]) => ({
    name,
    subcategories: Object.keys(subcategories),
  }));

  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="main-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content h-screen p-2 lg:p-4">
          <div className="card h-full bg-base-100">
            <div className="card-body h-full p-0">
              <span className="px-6 py-4">
                <Header params="Welcome" />
              </span>
              <main className="mb-2 mr-2 overflow-y-auto p-6 pb-4 pr-4">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Aliquam autem consectetur deserunt expedita facere nobis odit
                  possimus praesentium reiciendis vero! Ab corporis deleniti,
                  dolorum error est fuga incidunt ipsa ipsum iure labore laborum
                  modi nesciunt, odit omnis optio perferendis porro praesentium
                  quas quia quos reprehenderit sint sunt totam vero voluptas.
                </p>
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
