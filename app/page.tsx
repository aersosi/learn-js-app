import AddTask from "@/app/components/AddTask";
import TodoList from "@/app/components/TodoList";
import { getAllTodos } from "@/api";
import ThemeSwitch from "@/app/components/ThemeSwitch";

export default async function Home() {
  const tasks = await getAllTodos();

  return (
    <>
      <header className="container flex justify-between gap-4 py-8">
        <h1 className="text-2xl font-bold">Next TS Starter</h1>
        <ThemeSwitch />
      </header>

      <main className="container">
        <AddTask />
        <TodoList tasks={tasks} />
      </main>

      <footer></footer>
    </>
  );
}
