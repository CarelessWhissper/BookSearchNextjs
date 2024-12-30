import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// State for the books slice
export interface Book {
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  subject?: string[];
  description?: string;
  cover_i?: number;
  isbn?: string[];
  key?: string;
  coverUrl?: string;
}

interface BookState {
  searchResults: Book[];
  selectedBook: Book | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
  query: string;
}

const initialState: BookState = {
  searchResults: [],
  selectedBook: null,
  loading: false,
  error: null,
  currentPage: 1, // Initial page is 1
  itemsPerPage: 10, // Default number of items per page
  query: "",
};

// Async thunk to fetch books from the Open Library API
export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (query: string) => {
    const response = await axios.get(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(
        query
      )}&fields=key,title,author_name,first_publish_year,subject,isbn`
    );
    return response.data.docs;
  }
);

// Async thunk to fetch a book's description and cover
export const fetchBookDetails = createAsyncThunk(
  "books/fetchBookDetails",
  async (bookKey: string) => {
    const response = await axios.get(`https://openlibrary.org${bookKey}.json`);
    const data = response.data;

    return {
      key: bookKey,
      description:
        typeof data.description === "string"
          ? data.description
          : data.description?.value || "No description available.",
      cover_i: data.covers?.[0] || null, // Get the first cover ID if available
      isbn: data.isbn || [], // Store ISBNs if available
    };
  }
);
// Create the slice for books
const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setSelectedBook: (state, action: PayloadAction<Book | null>) => {
      state.selectedBook = action.payload;
    },

    clearResults(state) {
      state.searchResults = [];
    },

    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },

    setItemsPerPage(state, action: PayloadAction<number>) {
      state.itemsPerPage = action.payload;
    },

    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },

    resetPage(state) {
      state.currentPage = 1; // Reset to page 1
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(fetchBookDetails.fulfilled, (state, action) => {
        const { key, description, cover_i, isbn } = action.payload;
        const book = state.searchResults.find((book) => book.key === key);
        if (book) {
          book.description = description;
          book.cover_i = cover_i;
          book.isbn = isbn;
        }
      });
  },
});

export const {
  clearResults,
  setSelectedBook,
  setCurrentPage,
  setItemsPerPage,
  resetPage,
  setQuery,
} = bookSlice.actions;

export default bookSlice.reducer;
