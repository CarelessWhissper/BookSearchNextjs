import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookDetails } from "@/lib/createBookSlice";
import type { Book } from "@/lib/createBookSlice";
import { RootState } from "@/lib/store";
import { AppDispatch } from "@/lib/store";
import Link from "next/link";

// Define the props interface
interface BookDetailsProps {
  book: Book;
}

const BookDetails: React.FC<BookDetailsProps> = ({ book }) => {
  const dispatch = useDispatch<AppDispatch>();
  const bookFromStore = useSelector((state: RootState) => 
    state.books.searchResults.find((b) => b.key === book.key)
  );
  
  const loading = useSelector((state: RootState) => state.books.loading);
  const error = useSelector((state: RootState) => state.books.error);

  useEffect(() => {
    if (book.key && !bookFromStore?.description && !loading) {
      dispatch(fetchBookDetails(book.key));
    }
  }, [dispatch, book.key, bookFromStore?.description, loading]);

  // If the data is still being loaded
  if (loading) return <p>Loading...</p>;

  // If there's an error
  if (error) return <p>Error: {error}</p>;

  // Use bookFromStore if available, otherwise fall back to the prop
  const displayBook = bookFromStore || book;

  // Update the cover image URL generation
  const getCoverUrl = (book: Book) => {
    if (book.cover_i) {
      return `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
    } else if (book.isbn && book.isbn[0]) {
      return `https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-L.jpg`;
    }
    return "https://dummyimage.com/300x450/cccccc/ffffff&text=No+Image";
  };

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
          src={getCoverUrl(displayBook)}
          alt={`${displayBook.title} cover`}
          style={{
            width: "300px",
            height: "auto",
            borderRadius: "5px",
            flexShrink: 0,
          }}
        />
        <div>
          <h1 style={{ color: "#dfc778" }}>{displayBook.title}</h1>
          <p className="details-p">
            <strong>Author:</strong> {displayBook.author_name?.join(", ") || "Unknown"}
          </p>
          <p className="details-p">
            <strong>First Published:</strong> {displayBook.first_publish_year || "N/A"}
          </p>
          <p className="details-p">
            <strong>Genre:</strong>{" "}
            {displayBook.subject
              ? displayBook.subject.slice(0, 3).join(", ") + (displayBook.subject.length > 3 ? "..." : "")
              : "Unknown"}
          </p>
          <p className="details-p">
            <strong>Description:</strong> {displayBook.description || "Loading description..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;