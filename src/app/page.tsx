import NewsContainer from "@/components/NewsContainer";
export default function Home() {
  return (
    <div className="min-h-svh w-full flex flex-col items-center">
      <div className="text-center my-10 flex flex-col gap-y-2">
        <h1 className="text-3xl font-bold">
          WELCOME TO <span className="text-danger-500">QUICKNEWS</span>
        </h1>
        <p className="text-slate-300">Read news that matters to you 🥳</p>
      </div>
      <NewsContainer/>
    </div>
  );
}
