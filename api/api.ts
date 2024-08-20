import { ITopics } from "@/types/topics";

const baseUrl = "http://localhost:3001";

export const getAllTopics = async (): Promise<ITopics[]> => {
  const res = await fetch(`${baseUrl}/topics`, { cache: "no-store" });
  // Todo
  return await res.json();
};

export const addTodo = async (todo: ITopics): Promise<ITopics> => {
  const res = await fetch(`${baseUrl}/topics`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  // newTodo
  return await res.json();
};

export const editTodo = async (todo: ITopics): Promise<ITopics> => {
  const res = await fetch(`${baseUrl}/topics/${todo.id}`, {
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
  await fetch(`${baseUrl}/topics/${id}`, {
    method: "DELETE",
  });
};
