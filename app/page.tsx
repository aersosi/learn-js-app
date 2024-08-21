import { getAllTopics } from "@/api/api";
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
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content min-h-screen max-w-[80rem] px-4 lg:px-12">
          <Header params="Welcome" />

          <main>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
              autem consectetur deserunt expedita facere nobis odit possimus
              praesentium reiciendis vero! Ab corporis deleniti, dolorum error
              est fuga incidunt ipsa ipsum iure labore laborum modi nesciunt,
              odit omnis optio perferendis porro praesentium quas quia quos
              reprehenderit sint sunt totam vero voluptas.
            </p>
          </main>
        </div>
        <div className="drawer-side z-20">
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
