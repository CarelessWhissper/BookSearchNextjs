"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";

interface BookDetailsProps {
  book: {
    title: string;
    author_name?: string[];
    first_publish_year?: number;
    subject?: string[];
    description?: string;
    cover_i?: number;
    isbn?: string[];
    key?: string; 
  };
}

const BookDetails: React.FC<BookDetailsProps> = ({ book }) => {
 
  const [description, setDescription] = useState<string | null>(null);
 

  const getCoverUrl = (isbn: string[] | undefined) => {
    if (isbn && isbn.length > 0) {
      return `https://covers.openlibrary.org/b/isbn/${isbn[0]}-L.jpg`;
    }
    return "https://dummyimage.com/300x450/cccccc/ffffff&text=No+Image";
  };

  useEffect(() => {
    const fetchDescription = async () => {
      if (book.key) {
        try {
          const response = await fetch(`https://openlibrary.org${book.key}.json`);
          const data = await response.json();
          setDescription(
            typeof data.description === "string"
              ? data.description
              : data.description?.value || "No description available."
          );
        } catch (error) {
          console.error("Error fetching description:", error);
          setDescription("No description available.");
        }
      } else {
        setDescription("No description available.");
      }
    };

    fetchDescription();
  }, [book.key]);

  return (
    <div style={{ padding: "20px" }}>
      <Link href="/">
        <button
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
      </Link>
      <div style={{ display: "flex", gap: "20px" }}>
        <img
          src={getCoverUrl(book.isbn)}
          alt={`${book.title} cover`}
          style={{ width: "300px", height: "auto", borderRadius: "5px", flexShrink: 0 }}
        />
        <div>
          <h1 style={{color:"#dfc778"}}>{book.title}</h1>
          <p className="details-p">
            <strong>Author:</strong> {book.author_name?.join(", ") || "Unknown"}
          </p>
          <p className="details-p">
            <strong>First Published:</strong> {book.first_publish_year || "N/A"}
          </p>
          <p className="details-p">
            <strong>Genre:</strong>{" "}
            {book.subject
              ? book.subject.slice(0, 3).join(", ") + (book.subject.length > 3 ? "..." : "")
              : "Unknown"}
          </p>
          <p className="details-p">
            <strong>Description:</strong> {description || "Loading description..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;