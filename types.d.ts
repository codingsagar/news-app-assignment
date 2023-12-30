type UserDataa = {
  userId: string;
  favouriteArtices: string[];
  interestedTopics: string[];
};

type NewsSchema = {
  article_id: string;
  title: string;
  link: string;
  keywords: string[];
  creator: string[];
  video_url: null;
  description: string;
  content: string;
  pubDate: string;
  image_url: string;
  source_id: string;
  source_priority: number;
  country: string[];
  category: string[];
  language: string;
  ai_tag: string;
  sentiment: string;
  sentiment_stats: string;
};
