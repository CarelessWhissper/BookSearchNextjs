"use client";

import React from "react";
import { useRouter } from 'next/navigation'

interface Book {
  title: string;
  author_name?: string[];
  subject?: string[];
  first_publish_year?: number;
}

interface SearchResultsCardsProps {
  searchResults: Book[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const SearchResultsCards: React.FC<SearchResultsCardsProps> = ({
  searchResults,
  currentPage,
  itemsPerPage,
  onPageChange,
}) => {
  const router = useRouter();

  // Function to handle card click
  const handleCardClick = (book: Book) => {
    localStorage.setItem("selectedBook", JSON.stringify(book)); // Save the book data to localStorage
    router.push(`/details/${encodeURIComponent(book.title)}`); // Navigate to the details page
    
  };

  const paginatedResults = searchResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div style={{ padding: "20px" }}>
      {/* Display Cards */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        {paginatedResults.map((book: Book, index: number) => (
          <div
            key={index}
            onClick={() => handleCardClick(book)} // Add click handler
            style={{
              width: "300px",
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
              cursor: "pointer", // Show pointer cursor for clickability
            }}
          >
            <h3>{book.title || "Title not available"}</h3>
            <p>Author: {book.author_name?.join(", ") || "Unknown"}</p>
            <p>
              Genre:{" "}
              {book.subject
                ? book.subject.slice(0, 3).join(", ") + (book.subject.length > 3 ? "..." : "")
                : "Unknown"}
            </p>
            <p>First Published: {book.first_publish_year || "N/A"}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {searchResults.length > itemsPerPage && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              padding: "10px 20px",
              backgroundColor: "#704d37",
              color: "#dfc776",
              fontSize: "16px",
              border: "none",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of{" "}
            {Math.ceil(searchResults.length / itemsPerPage)}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage * itemsPerPage >= searchResults.length}
            style={{
              padding: "10px 20px",
              backgroundColor: "#704d37",
              color: "#dfc776",
              fontSize: "16px",
              border: "none",
              cursor: "pointer",
              marginLeft: "10px",
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResultsCards;
