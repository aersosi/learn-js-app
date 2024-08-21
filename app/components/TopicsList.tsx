import React from "react";
import Topic from "@/app/components/Topic";
import { ITopicListProps } from "@/types/topics";

const TopicsList: React.FC<ITopicListProps> = ({ data }) => {
  return (
    <div className="my-12 overflow-x-auto">
      {Object.entries(data).map(([category, subcategories]) => (
        <div key={category}>
          {Object.entries(subcategories).map(([subcategory, topicsList]) => (
            <div key={subcategory}>
              <h3 className="mt-4 text-lg font-semibold">{subcategory}</h3>
              {topicsList.map((topic, index) => (
                <Topic
                  key={topic.id}
                  category={category}
                  subcategory={subcategory}
                  topic={topic}
                  index={index}
                />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TopicsList;
