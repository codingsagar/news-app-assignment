import NewsCard from "./Card";
import { fetchNews } from "@/app/actions";

export default async function NewsContainer() {
  const data = await fetchNews();
  const newsData: NewsSchema[] = data.results;

  const content = newsData.map((item: NewsSchema) => {
    return <NewsCard news={item} />;
  });

  return <div className="flex flex-col gap-10 mb-10 mx-20">{content}</div>;
}
