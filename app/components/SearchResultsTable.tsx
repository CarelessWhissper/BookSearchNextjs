"use client";

import React from "react";
import { Table, Pagination } from "antd";

interface Book {
  title: string;
  author_name?: string[];
}

interface SearchResultsTableProps {
  searchResults: Book[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const SearchResultsTable: React.FC<SearchResultsTableProps> = ({
  searchResults,
  currentPage,
  itemsPerPage,
  onPageChange,
}) => {
  // Data for the table
  const paginatedResults = searchResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    {
      title: "Book Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Author",
      dataIndex: "author_name",
      key: "author_name",
      render: (authors: string[] | undefined) =>
        authors ? authors.join(", ") : "Unknown",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      {/* Ant Design Table */}
      <Table
        dataSource={paginatedResults.map((book, index) => ({
          key: index,
          ...book,
        }))}
        columns={columns}
        pagination={false} // Disable built-in pagination
        style={{ marginBottom: "20px" }}
        onRow={(record) => ({
          onClick: () => {
            // Handle row click to navigate
            localStorage.setItem("selectedBook", JSON.stringify(record));
            window.location.href = `/details/${encodeURIComponent(record.title)}`;
          },
        })}
      />

      {/* Ant Design Pagination */}
      <Pagination
        current={currentPage}
        total={searchResults.length}
        pageSize={itemsPerPage}
        onChange={onPageChange}
        style={{ textAlign: "center" }}
      />
    </div>
  );
};

export default SearchResultsTable;
