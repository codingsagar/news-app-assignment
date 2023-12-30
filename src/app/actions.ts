"use server";

export async function fetchNews() {
  const res = await fetch(
    `https://newsdata.io/api/1/news?apikey=${process.env.NEXT_PRIVATE_NEWSDATA_API_KEY}&category=top&language=en`
  );

  const data = await res.json();

  return data;
}

  
