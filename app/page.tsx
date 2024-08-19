import AddTask from "@/app/components/AddTask";
import TodoList from "@/app/components/TodoList";
import {getAllTodos} from "@/api";
export const runtime = "edge";

export default async function Home() {
    const tasks = await getAllTodos();

    return (
        <>
            <header className='container text-center py-8'>
                <h1 className='text-3xl font-bold'>Next TS Starter</h1>
            </header>

            <main className='container'>
                <AddTask/>
                <TodoList tasks={tasks}/>
            </main>


            <footer></footer>
        </>
    );
}
