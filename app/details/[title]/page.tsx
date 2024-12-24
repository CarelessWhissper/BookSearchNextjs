"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import BookDetails from "../../components/BookDetails";

interface Params {
  title: string;
}

const DetailsPage = ({ params }: { params: Params }) => {
  const { title } = params; // Access the dynamic route parameter directly
  const router = useRouter();
  const [book, setBook] = useState(null);

  useEffect(() => {
    if (!title) return; // Don't proceed if title is not yet available

    // Fetch book data based on the title or from local storage
    const bookData = localStorage.getItem("selectedBook");
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
