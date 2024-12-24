"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchBooks } from "@/lib/createBookSlice";
import SearchSection from "../components/Search";
import SearchResultsCards from "../components/SearchResultsCards";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchResults, loading, error } = useSelector(
    (state: RootState) => state.books
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page

  const handleSearch = (query: string) => {
    if (query.trim().length > 2) {
      setCurrentPage(1); // Reset to first page for new search
      dispatch(fetchBooks(query));
    }
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div style={{ padding: "20px" }}>
        <SearchSection onSearch={handleSearch} />
      </div>

      {loading && <div>Loading...</div>}
      {error && <p>Error: {error}</p>}

      {searchResults.length > 0 && (
        <SearchResultsCards
          searchResults={searchResults}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default HomePage;
