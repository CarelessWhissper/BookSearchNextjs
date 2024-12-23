"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "@/lib/createBookSlice";
import { RootState, AppDispatch } from "@/lib/store";
import SearchSection from "./Search";

interface Book {
  title: string;
  author_name?: string[];
  first_publish_year?: number;
}

const SearchPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const dispatch = useDispatch<AppDispatch>();
  const { searchResults, loading, error } = useSelector(
    (state: RootState) => state.books
  );

  const handleSearch = (value: string) => {
    if (value.trim().length > 2) {
      dispatch(fetchBooks(value));
    }
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedResults = searchResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div style={{ padding: "20px" }}>
      <SearchSection onSearch={handleSearch} />

      {loading && <div>Loading...</div>}
      {error && <p>Error: {error}</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {paginatedResults.map((book: Book, index: number) => (
          <div
            key={index}
            style={{
              width: "300px",
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3>{book.title}</h3>
            <p>Author: {book.author_name?.join(", ") || "Unknown"}</p>
            <p>First Published: {book.first_publish_year || "N/A"}</p>
          </div>
        ))}
      </div>

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
          }}
        >
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>
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
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SearchPage;
