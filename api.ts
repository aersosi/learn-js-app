import {ITask} from "@/types/tasks";

const baseUrl = 'http://localhost:3001'

export const getAllTodos = async (): Promise<ITask[]> => {
    const res = await fetch(`${baseUrl}/tasks`, { cache: 'no-store' });
    const todos = await res.json();
    return todos;
}

export const addTodo = async (todo: Omit<ITask, 'id'>): Promise<ITask> => {
    try {
        console.log('Sending request to:', `${baseUrl}/tasks`);
        console.log('Request body:', JSON.stringify(todo));

        const res = await fetch(`${baseUrl}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        });

        if (!res.ok) {
            const errorBody = await res.text();
            console.error('Error response:', errorBody);
            throw new Error(`HTTP error! status: ${res.status}, body: ${errorBody}`);
        }

        const newTodo = await res.json();
        console.log('Response:', newTodo);
        return newTodo;
    } catch (error) {
        console.error("Failed to add todo:", error);
        throw error;
    }
}