import { ICurriculum } from "@/types/curriculum";

const baseUrl = "http://localhost:3001";

export const getAllTodos = async (): Promise<ICurriculum[]> => {
  const res = await fetch(`${baseUrl}/tasks`, { cache: "no-store" });
  // Todo
  return await res.json();
};

export const addTodo = async (todo: ICurriculum): Promise<ICurriculum> => {
  const res = await fetch(`${baseUrl}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  // newTodo
  return await res.json();
};

export const editTodo = async (todo: ICurriculum): Promise<ICurriculum> => {
  const res = await fetch(`${baseUrl}/tasks/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  // updatedTodo
  return await res.json();
};

export const deleteTodo = async (id: String): Promise<void> => {
  await fetch(`${baseUrl}/tasks/${id}`, {
    method: "DELETE",
  });
};
