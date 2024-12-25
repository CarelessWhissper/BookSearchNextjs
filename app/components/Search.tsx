"use client";
import { useState } from "react";

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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100vw", // Full width of the viewport
        margin: 0, // Removes margin
        padding: 0, // Removes padding
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column", // Stack items vertically for better responsiveness
          justifyContent: "center",
          gap: "10px", // Adjust spacing for smaller screens
          width: "100%",
          padding: "20px", // Ensure proper padding for smaller screens
          maxWidth: "400px", // Constrain the container width on large screens
        }}
      >
        <input
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Enter book info (author, title, genre...)"
          style={{
            width: "100%", // Make input responsive
            padding: "10px",
            fontSize: "16px",
            textAlign: "center",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <button
          onClick={handleButtonClick}
          style={{
            backgroundColor: "#704d37",
            color: "#dfc776",
            fontSize: "16px",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%", // Make button responsive
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
  
};

export default SearchSection;
