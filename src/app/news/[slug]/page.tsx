import { Button, Chip } from "@nextui-org/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import SaveFavouriteArticleButton from "@/components/SaveFavouriteArticleButton";
dayjs.extend(relativeTime);

type PropsType = {
  searchParams: {
    news: string;
  };
};

function RenderImage({ image }: { image: string | null }) {
  if (!image) return null;

  const imageLink = image.split(" ")[0];

  if (imageLink.includes("www.youtube.com")) {
    return (
      <iframe
        src={imageLink}
        className="rounded-md my-5 h-96 w-3/4"
        allowFullScreen
      />
    );
  }
  return <img src={imageLink} alt="News Picture" className="rounded-md my-5 min-h-72" />;
}
export default function Page({ searchParams: { news } }: PropsType) {
  const data: NewsSchema = JSON.parse(news);
  return (
    <div className="flex justify-center my-16">
      <div className="min-h-[70vh] md:w-[70%] m-5 md:m-0">
        <div className="flex items-center mb-5 justify-between">
          <div className="flex gap-2 flex-wrap">
            <Chip color="primary" className="rounded-md">
              {data.creator ? data.creator : "Unknown"}
            </Chip>
            <Chip color="secondary" className="rounded-md">
              {data.source_id}
            </Chip>
            <Chip color="danger" className="rounded-md">
              {data.category}
            </Chip>
            <Chip color="warning" className="rounded-md">
              {data.country}
            </Chip>
            <Chip color="success" className="rounded-md">
              {data.language}
            </Chip>
          </div>
          <SaveFavouriteArticleButton news={JSON.parse(news)}/>
        </div>

        <h1 className="font-bold text-2xl">{data.title}</h1>
        {<RenderImage image={data.image_url} />}
        <p className="font-medium text-gray-400 text-sm my-1">
          Posted : {dayjs(data.pubDate).fromNow()}
        </p>
        <p className="my-5 text-slate-300">{data.description}</p>
        <a href={data.link} target="_blank">
          <Button color="danger">Read more</Button>
        </a>
      </div>
    </div>
  );
}
