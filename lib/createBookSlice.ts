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
}

const initialState: BookState = {
  searchResults: [],
  selectedBook: null,
  loading: false,
  error: null,
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
export const { clearResults } = bookSlice.actions;
export const { setSelectedBook } = bookSlice.actions;
export default bookSlice.reducer;