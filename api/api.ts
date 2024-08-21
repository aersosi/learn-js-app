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
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("Failed to fetch topics");
    }
    const data = await res.json();
    return data.record.curriculum as ICategory;
  } catch (error) {
    console.error("Error fetching topics:", error);
    return;
  }
};

export const editAnswer = async (
  topic: ITopic,
  category: string,
  subcategory: string
): Promise<ITopic> => {
  const currentData = await getAllTopics();
  const topicIndex = currentData[category][subcategory].findIndex(
    (t: ITopic) => t.id === topic.id
  );

  if (topicIndex !== -1) {
    currentData[category][subcategory][topicIndex] = topic;

    const res = await fetch(baseUrl, {
      method: "PUT",
      headers,
      body: JSON.stringify({ curriculum: currentData }),
    });

    await res.json();
  }

  return topic;
};

export const deleteAnswer = async (
  id: string,
  category: string,
  subcategory: string
): Promise<void> => {
  const currentData = await getAllTopics();
  const topicIndex = currentData[category][subcategory].findIndex(
    (t: ITopic) => t.id === id
  );

  if (topicIndex !== -1) {
    currentData[category][subcategory][topicIndex].answer = "";

    await fetch(baseUrl, {
      method: "PUT",
      headers,
      body: JSON.stringify({ curriculum: currentData }),
    });
  }
};
