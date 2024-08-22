import { ICategory, ITopic } from "@/types/topics";

let cachedTopics: ICategory | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 3600000; // 1 hour

let cachedVersion: number | null = null;

export const getCachedVersion = (): number | null => {
  return cachedVersion;
};

export const setCachedVersion = (version: number): void => {
  cachedVersion = version;
};

export const getCachedTopics = (): ICategory | null => {
  if (cachedTopics && Date.now() - lastFetchTime < CACHE_DURATION) {
    return cachedTopics;
  }
  return null;
};

export const setCachedTopics = (topics: ICategory): void => {
  cachedTopics = topics;
  lastFetchTime = Date.now();
};

export const updateCachedTopic = (
  category: string,
  subcategory: string,
  updatedTopic: ITopic
): void => {
  if (!cachedTopics) return;

  const topicIndex = cachedTopics[category]?.[subcategory]?.findIndex(
    (t: ITopic) => t.id === updatedTopic.id
  );

  if (topicIndex !== -1) {
    cachedTopics[category][subcategory][topicIndex] = updatedTopic;
  }
};

export const deleteCachedAnswer = (
  category: string,
  subcategory: string,
  id: string
): void => {
  if (!cachedTopics) return;

  const topicIndex = cachedTopics[category]?.[subcategory]?.findIndex(
    (t: ITopic) => t.id === id
  );

  if (topicIndex !== -1) {
    cachedTopics[category][subcategory][topicIndex].answer = "";
  }
};
