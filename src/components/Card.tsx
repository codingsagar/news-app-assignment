import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Chip } from "@nextui-org/react";
import Link from "next/link";

dayjs.extend(relativeTime);

function RenderImage({ image }: { image: string | null }) {
  if (!image) return null;

  const imageLink = image.split(" ")[0];

  if (imageLink.includes("www.youtube.com")) {
    return (
      <iframe
        src={imageLink}
        className="w-full rounded-tl-lg rounded-bl-lg sm:w-72"
        allowFullScreen
      />
    );
  }
  return (
    <img
      src={imageLink}
      alt="News Picture"
      className="w-full rounded-tl-lg rounded-bl-lg sm:w-72"
    />
  );
}

export default function NewsCard({ news }: { news: NewsSchema }) {
  return (
    <Link
      href={{
        pathname: `/news/${news.article_id}`,
        query: { news: JSON.stringify(news) },
      }}
    >
      <div className="flex flex-col rounded-lg bg-white dark:bg-slate-900 w-full border border-slate-500 mb-4 p-4 sm:flex-row">
        {<RenderImage image={news?.image_url} />}
        <div className="flex flex-col justify-start p-4">
          <div className="flex flex-wrap gap-2">
            <Chip color="primary" className="rounded-md">
              {news?.creator ? news?.creator : "Unknown"}
            </Chip>
            <Chip color="secondary" className="rounded-md">
              {news?.source_id}
            </Chip>
            <Chip color="danger" className="rounded-md">
              {news?.category}
            </Chip>
            <Chip color="warning" className="rounded-md">
              {news?.country}
            </Chip>
            <Chip color="success" className="rounded-md">
              {news?.language}
            </Chip>
          </div>
          <h5 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50 mt-4">
            {news?.title}
          </h5>
          <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200 break-words">
            {news?.description.slice(0, 300)}...
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-300">
            {dayjs(news?.pubDate).fromNow()}
          </p>
        </div>
      </div>
    </Link>
  );
}
