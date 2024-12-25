"use client";
import { useState } from "react";

import { Button } from "antd";

const SearchSection = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleButtonClick = () => {
    console.log("Search button clicked");
    if (searchQuery.trim()) {
      console.log("Search query:", searchQuery);
      onSearch(searchQuery);
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1457369804613-52c61a468e7d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YWVzdGhldGljJTIwYm9va3N8ZW58MHx8MHx8fDA%3D)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "400px",
        width: "100vw", 
        display: "flex",
        justifyContent: "center", 
        alignItems: "center", 
        padding: "0",
        margin: "0",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          width: "90%",
          maxWidth: "400px",
        }}
      >
        <input
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Enter book info (author, title, genre...)"
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            textAlign: "center",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
          <Button
          onClick={handleButtonClick}
          style={{
            backgroundColor: "#704d37",
            color: "#dfc776",
            fontSize: "14px",
            padding: "8px 16px",
            borderRadius: "5px",
            width: "50%",
          }}
        >
          Search
        </Button>
      </div>
    </div>
  );
  
};

export default SearchSection;
