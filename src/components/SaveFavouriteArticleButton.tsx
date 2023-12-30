"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import { IoMdHeartEmpty } from "react-icons/io";
import { toast } from "sonner";
import useAuthStore from "../../store";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import firebase_app from "@/lib/firebase/firebase-config";

const db = getFirestore(firebase_app);

export default function SaveFavouriteArticleButton({
  news,
}: {
  news: NewsSchema;
}) {
  const { isAuthenticated, user } = useAuthStore();

  const handleSaveArticles = async () => {
    if (!isAuthenticated) return toast.error("Login to save articles !");

    const userRef = doc(db, "users", user?.uid as string);
    try {
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {

        await updateDoc(userRef, {
          savedArticles: arrayUnion(JSON.stringify(news)),
        });

        toast.success("News Post saved successfully !")

      } else {
        await setDoc(doc(db, "users", user?.uid as string), {
          savedArticles: [JSON.stringify(news)],
          interestedTopics: [],
        });
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  return (
    <Button
      isIconOnly
      color="danger"
      aria-label="Like"
      className="text-2xl rounded-full"
      onClick={handleSaveArticles}
    >
      <IoMdHeartEmpty />
    </Button>
  );
}
