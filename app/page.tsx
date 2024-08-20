import AddTopic from "@/app/components/AddTopic";
import TodoList from "@/app/components/TodoList";
import { getAllTodos } from "@/api/api";
import ThemeSwitch from "@/app/components/ThemeSwitch";

export default async function Home() {
  const topics = await getAllTodos();

  return (
    <>
      <header className="container flex justify-between gap-4 py-8">
        <h1 className="text-2xl font-bold">Next TS Starter</h1>
        <ThemeSwitch />
      </header>

      <main className="container">
        <AddTopic />
        <TodoList topics={topics} />
      </main>

      <footer></footer>
    </>
  );
}
