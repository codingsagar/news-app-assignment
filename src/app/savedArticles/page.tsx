"use client";
import { getDoc, doc, getFirestore } from "firebase/firestore";
import firebase_app from "@/lib/firebase/firebase-config";
import { toast } from "sonner";
import NewsCard from "@/components/Card";
import { useState } from "react";
import useAuthStore from "../../../store";
import { useRouter } from "next/navigation";

type PropsType = {
  searchParams: {
    uid: string;
  };
};

const getSavedArticles = async (uid: string) => {
  const db = getFirestore(firebase_app);
  const docRef = doc(db, "users", uid as string);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      var content = docSnap.data().savedArticles;
      return content;
    } else {
      return <div>No saved articles ! </div>;
    }
  } catch (error) {
    return <div>{JSON.stringify(error)}</div>;
  }
};

export default function SavedArticles({ searchParams: { uid } }: PropsType) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [savedArticles, setSavedArticles] = useState<string[]>([]);

  if (!isAuthenticated) {
    toast.error("You are not logged in !");
    router.push("/login");
  }
  if (!uid) {
    <div className="flex text-2xl font-bold text-white justify-center items-center min-h-[70vh]">
      You are not logged in !
    </div>;

    return toast.error("Please login to access saved articles !");
  } else {
    getSavedArticles(uid).then((res) => {
      setSavedArticles(res);
    });
  }

  return savedArticles.length > 0 ? (
    <div className="flex flex-col gap-10 mb-10 mx-20">
      <h2 className="text-2xl text-danger-500 font-bold mt-10">
        Saved Articles - {savedArticles.length}
      </h2>
      {savedArticles?.map((item, index) => {
        return <NewsCard news={JSON.parse(item)} key={index} />;
      })}
    </div>
  ) : (
    <div className="min-h-[70vh] text-2xl flex justify-center items-center font-bold">
      No saved articles !
    </div>
  );
}
