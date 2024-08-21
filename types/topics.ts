export interface ITopic {
  id: string;
  question: string;
  answer: string;
}

export interface ISubcategory {
  [subcategory: string]: ITopic[];
}
export interface ICategory {
  [category: string]: ISubcategory;
}

export interface ITopicListProps {
  data: ICategory;
}

export interface ITopicProps {
  topic: ITopic;
  index: number;
  category: string;
  subcategory: string;
}

interface Category {
  name: string;
  subcategories: string[];
}

interface CategoryNavProps {
  categories: Category[];
}
