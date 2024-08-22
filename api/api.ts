import { ICategory, ISubcategory, ITopic } from "@/types/topics";
import { masterKey } from "./master-key";

const baseUrl = "https://api.jsonbin.io/v3/b/66c5a4f5ad19ca34f898ed01";
const headers = {
  "Content-Type": "application/json",
  "X-Master-Key": masterKey,
};

export const getTopicsByCategory = async (
  category: string
): Promise<ISubcategory> => {
  const allTopics = await getAllTopics();
  return allTopics[category] || {};
};

export const getAllTopics = async (): Promise<ICategory> => {
  try {
    const res = await fetch(baseUrl, {
      method: "GET",
      headers,
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      console.error(`Failed to fetch topics: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    if (!data.record?.curriculum) {
      console.error("Invalid data structure received");
    }
    return data.record.curriculum as ICategory;
  } catch (error) {
    console.error("Error fetching topics:", error);
    return {} as ICategory;
  }
};

export const editAnswer = async (
  topic: ITopic,
  category: string,
  subcategory: string
): Promise<ITopic> => {
  try {
    const currentData = await getAllTopics();
    if (!currentData[category]?.[subcategory]) {
      console.error("Category or subcategory not found");
    }
    const topicIndex = currentData[category][subcategory].findIndex(
      (t: ITopic) => t.id === topic.id
    );

    if (topicIndex === -1) {
      console.error("Topic not found");
    }

    currentData[category][subcategory][topicIndex] = topic;

    const res = await fetch(baseUrl, {
      method: "PUT",
      headers,
      body: JSON.stringify({ curriculum: currentData }),
    });

    if (!res.ok) {
      console.error(`Failed to update topic: ${res.status} ${res.statusText}`);
    }

    await res.json();
    return topic;
  } catch (error) {
    console.error("Error editing answer:", error);
    throw error;
  }
};

export const deleteAnswer = async (
  id: string,
  category: string,
  subcategory: string
): Promise<void> => {
  try {
    const currentData = await getAllTopics();
    if (!currentData[category]?.[subcategory]) {
      console.error("Category or subcategory not found");
    }
    const topicIndex = currentData[category][subcategory].findIndex(
      (t: ITopic) => t.id === id
    );

    if (topicIndex === -1) {
      console.error("Topic not found");
    }

    currentData[category][subcategory][topicIndex].answer = "";

    const res = await fetch(baseUrl, {
      method: "PUT",
      headers,
      body: JSON.stringify({ curriculum: currentData }),
    });

    if (!res.ok) {
      console.error(`Failed to delete answer: ${res.status} ${res.statusText}`);
    }
  } catch (error) {
    console.error("Error deleting answer:", error);
    throw error;
  }
};
