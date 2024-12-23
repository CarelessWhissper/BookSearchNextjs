"use client";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { fetchBooks } from "@/lib/createBookSlice";
import SearchSection from "../components/Search";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = (query: string) => {
    if (query.trim().length > 2) {
      dispatch(fetchBooks(query));
    }
  };

  return (
    <div>
      <div style={{ padding: "20px" }}>
        <SearchSection onSearch={handleSearch} />
      </div>
    </div>
  );
};

export default HomePage;
