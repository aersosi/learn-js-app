import { ICategory } from "@/types/topics";
import { getCachedTopics, setCachedTopics } from "./cache";

export const runtime = 'edge';

const MASTER_KEY: string = process.env.MASTER_KEY || "";

const binId = "66c5a4f5ad19ca34f898ed01";

const baseUrl = `https://api.jsonbin.io/v3/b/${binId}`;
const headers = {
  "Content-Type": "application/json",
  "X-Master-Key": MASTER_KEY,
};

export const fetchAllTopics = async (): Promise<ICategory> => {
  const cachedTopics = getCachedTopics();
  if (cachedTopics) return cachedTopics;

  try {
    const res = await fetch(baseUrl, {
      method: "GET",
      headers,
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error(
        `Failed to fetch topics: ${res.status} ${res.statusText}`
      );
    }
    const data = await res.json();
    if (!data.record?.curriculum) {
      throw new Error("Invalid data structure received");
    }
    const topics = data.record.curriculum as ICategory;
    setCachedTopics(topics);
    return topics;
  } catch (error) {
    console.error("Error fetching topics:", error);
    throw error;
  }
};

export const saveTopics = async (topics: ICategory): Promise<void> => {
  try {
    const res = await fetch(baseUrl, {
      method: "PUT",
      headers,
      body: JSON.stringify({ curriculum: topics }),
    });
    if (!res.ok) {
      throw new Error(`Failed to save topics: ${res.status} ${res.statusText}`);
    }
    setCachedTopics(topics);
  } catch (error) {
    console.error("Error saving topics:", error);
    throw error;
  }
};
