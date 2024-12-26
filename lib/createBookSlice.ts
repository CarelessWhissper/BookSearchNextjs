import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// state for the books slice
interface Book {
  title: string;
  author: string;
  publicationDate: Date;
  description: string;
  coverImage: string;
}

interface BookState {
  searchResults: any[];
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
  query: ""
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

// Create the slice for books
const bookSlice = createSlice({
  name: 'books',
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
    setQuery: (state, action) => {
      state.query = action.payload;
    },

    resetPage(state) {
      state.currentPage = 1; // Reset to page 1
    }
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
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { clearResults, setSelectedBook, setCurrentPage, setItemsPerPage, resetPage,setQuery } = bookSlice.actions;
export default bookSlice.reducer;
