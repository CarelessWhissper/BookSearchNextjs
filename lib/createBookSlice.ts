import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

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
  async (searchQuery: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${searchQuery}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      return data.docs.map((book: any) => ({
        title: book.title,
        author: book.author_name?.[0] || "Unknown Author",
        publicationDate: book.first_publish_year || "Unknown Date",
        description: book.subjects?.join(", ") || "No description available",
        coverImage: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
          : "https://via.placeholder.com/150",
      }));
    } catch (error: any) {
      return rejectWithValue(error.message || 'An error occurred');
    }
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