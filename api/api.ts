import { ISubcategory, ITopic } from "@/types/topics";
import { fetchAllTopics, saveTopics } from "./topicService";
import {
  updateCachedTopic,
  deleteCachedAnswer,
  setCachedTopics,
} from "./cache";

export const runtime = process.env.RUNTIME || "edge";
export const getTopicsByCategory = async (
  category: string
): Promise<ISubcategory> => {
  const allTopics = await fetchAllTopics();
  return allTopics[category] || {};
};

export const getAllTopics = fetchAllTopics;

export const editAnswer = async (
  topic: ITopic,
  category: string,
  subcategory: string
): Promise<ITopic> => {
  // Optimistic update
  updateCachedTopic(category, subcategory, topic);

  try {
    const currentData = await fetchAllTopics();
    if (!currentData[category]?.[subcategory]) {
      throw new Error("Category or subcategory not found");
    }
    const topicIndex = currentData[category][subcategory].findIndex(
      (t: ITopic) => t.id === topic.id
    );
    if (topicIndex === -1) {
      throw new Error("Topic not found");
    }
    currentData[category][subcategory][topicIndex] = topic;
    await saveTopics(currentData);
    return topic;
  } catch (error) {
    console.error("Error editing answer:", error);
    // Rollback optimistic update
    const originalData = await fetchAllTopics();
    setCachedTopics(originalData);
    throw error;
  }
};

export const deleteAnswer = async (
  id: string,
  category: string,
  subcategory: string
): Promise<void> => {
  // Optimistic update
  deleteCachedAnswer(category, subcategory, id);

  try {
    const currentData = await fetchAllTopics();
    if (!currentData[category]?.[subcategory]) {
      throw new Error("Category or subcategory not found");
    }
    const topicIndex = currentData[category][subcategory].findIndex(
      (t: ITopic) => t.id === id
    );
    if (topicIndex === -1) {
      throw new Error("Topic not found");
    }
    currentData[category][subcategory][topicIndex].answer = "";
    await saveTopics(currentData);
  } catch (error) {
    console.error("Error deleting answer:", error);
    // Rollback optimistic update
    const originalData = await fetchAllTopics();
    setCachedTopics(originalData);
    throw error;
  }
};
