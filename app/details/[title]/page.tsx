"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BookDetails from "../../components/BookDetails";

const DetailsPage = () => {
  const params = useParams(); // Retrieve params using useParams
  const router = useRouter();
  const [book, setBook] = useState(null);
  const [title, setTitle] = useState<string | null>(null);

  useEffect(() => {
    /*
  params is now a promise in the latest versions of Next.js,
    Extract `title` from `params` and ensure it's a string
    */
    if (params?.title && typeof params.title === "string") {
      setTitle(params.title);
    } else {
      setTitle(null); // Handle cases where `title` is not a string
    }
  }, [params]);

  useEffect(() => {
    if (!title) return; // Wait until the title is available

    // Fetch book data based on the title or from local storage
    const bookData = localStorage.getItem("selectedBook");

    console.log("data in storage",bookData);
    if (bookData) {
      setBook(JSON.parse(bookData));
    } else {
      router.push("/"); // Redirect to the home page if no book data is found
    }
  }, [title, router]);

  if (!book) {
    return <p>Loading...</p>;
  }

  return <BookDetails book={book} />;
};

export default DetailsPage;
