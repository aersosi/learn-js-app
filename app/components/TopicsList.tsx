import React from "react";
import Topic from "@/app/components/Topic";
import { ITopicListProps } from "@/types/topics";
import { FiLink2 } from "react-icons/fi";

const TopicsList: React.FC<ITopicListProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      {Object.entries(data).map(([category, subcategories]) => (
        <div key={category}>
          {Object.entries(subcategories).map(([subcategory, topicsList]) => (
            <div className="mb-12 flex flex-col gap-4" key={subcategory}>
              <h3 className="text-lg font-semibold" id={subcategory}>
                <a
                  href={`#${subcategory}`}
                  className="group"
                  tabIndex="-1"
                  aria-label={`Link to ${subcategory}`}
                >
                  <span className="flex items-center gap-2">
                    {subcategory}
                    <FiLink2
                      size={20}
                      className="opacity-0 transition group-hover:opacity-100"
                    />
                  </span>
                </a>
              </h3>
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
