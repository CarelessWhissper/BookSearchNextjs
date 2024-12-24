"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "@/lib/createBookSlice";
import { RootState, AppDispatch } from "@/lib/store";
import SearchSection from "./Search";

interface Book {
  title: string;
  author_name?: string[];
  subjects?: string[];
  first_publish_year?: number;
}

const SearchPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of books per page
  const dispatch = useDispatch<AppDispatch>();
  const { searchResults, loading, error } = useSelector(
    (state: RootState) => state.books
  );

  // Search Handler
  const handleSearch = (query: string) => {
    if (query.trim().length > 2) {
      setCurrentPage(1); // Reset to first page for new search
      dispatch(fetchBooks(query));
    }
  };

  // Pagination Logic
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Paginated Results
  const paginatedResults = searchResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div style={{ padding: "20px" }}>
      <SearchSection onSearch={handleSearch} />

      {loading && <div>Loading...</div>}
      {error && <p>Error: {error}</p>}

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
            style={{
              width: "300px",
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
            }}
          >
            <h3>{book.title}</h3>
            <p>Author: {book.author_name?.join(", ") || "Unknown"}</p>
            <p>Genre: {book.subjects?.join(", ") || "Unknown"}</p>
            <p>First Published: {book.first_publish_year || "N/A"}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
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
          Page {currentPage} of {Math.ceil(searchResults.length / itemsPerPage)}
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
    </div>
  );
};

export default SearchPage;
