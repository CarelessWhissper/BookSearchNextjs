"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface BookDetailsProps {
  book: {
    title: string;
    author_name?: string[];
    first_publish_year?: number;
    subject?: string[];
    description?: string;
    cover_i?: number;
  };
}

const BookDetails: React.FC<BookDetailsProps> = ({ book }) => {
  const router = useRouter();

  const getCoverUrl = (coverId: number | undefined) =>
    coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
      : "https://via.placeholder.com/150";

  return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={() => router.back()}
        style={{
          padding: "10px 20px",
          backgroundColor: "#704d37",
          color: "#dfc776",
          fontSize: "16px",
          border: "none",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Back to Results
      </button>
      <div style={{ display: "flex", gap: "20px" }}>
        <img
          src={getCoverUrl(book.cover_i)}
          alt={`${book.title} cover`}
          style={{ width: "300px", height: "auto", borderRadius: "5px" }}
        />
        <div>
          <h1>{book.title}</h1>
          <p>
            <strong>Author:</strong> {book.author_name?.join(", ") || "Unknown"}
          </p>
          <p>
            <strong>First Published:</strong> {book.first_publish_year || "N/A"}
          </p>
          <p>
            <strong>Genre:</strong>{" "}
            {book.subject
              ? book.subject.slice(0, 3).join(", ") + (book.subject.length > 3 ? "..." : "")
              : "Unknown"}
          </p>
          <p>
            <strong>Description:</strong> {book.description || "No description available."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
