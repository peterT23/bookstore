import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../apiService";
import { toast } from "react-toastify";

const initialState = {
  favorite: [],
  books: [],
  bookDetails: [],
  status: "idle",
};

export const getBooksAsync = createAsyncThunk(
  "books/getBooks",
  async (pageNum, limit, query) => {
    let url = `/books?_page=${pageNum}&_limit=${limit}`;
    if (query) url += `&q=${query}`;
    const books = await api.get(url);
    // console.log("books", books);
    return books.data;
  }
);

export const getBookDetailData = createAsyncThunk(
  "books/bookDetail",
  async (id) => {
    try {
      const res = await api.get(`/books/${id}`);
      console.log("res book detail", res);
      return res.data;
    } catch (error) {
      toast.error(error.message);
    }
  }
);

export const addFavoriteBooksAsync = createAsyncThunk(
  "books/addFavoriteBooks",
  async (addingBook) => {
    if (!addingBook) return;
    try {
      await api.post(`/favorites`, addingBook);
      toast.success("The book has been added to the reading list!");
    } catch (error) {
      toast.error(error.message);
    }
  }
);

export const getFavoritebooks = createAsyncThunk(
  "books/getFavorite",
  async () => {
    try {
      const favoriteBooks = await api.get("/favorites");
      return favoriteBooks.data;
    } catch (error) {
      toast.error(error.message);
    }
  }
);

export const removeFavoriteBookAsync = createAsyncThunk(
  "books/removeBookFromFavorite",
  async (removeId) => {
    if (!removeId) return;
    try {
      await api.delete(`/favorites/${removeId}`);
      toast.success("The book has been removed");
    } catch (error) {
      toast.error(error.message);
    }
  }
);

export const bookSlice = createSlice({
  name: "Book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooksAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBooksAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.books = action.payload;
      })
      .addCase(getBooksAsync.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      });
    builder
      .addCase(getBookDetailData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBookDetailData.fulfilled, (state, action) => {
        state.status = "idle";
        state.bookDetails = action.payload;
        console.log("bookdetaildata", action.payload);
      })
      .addCase(getBookDetailData.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      });
    builder
      .addCase(addFavoriteBooksAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addFavoriteBooksAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // state.favorite.push(action.payload);
        console.log("bookdetaildata", action.payload);
      })
      .addCase(addFavoriteBooksAsync.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      });
    builder
      .addCase(getFavoritebooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFavoritebooks.fulfilled, (state, action) => {
        state.status = "idle";
        state.favorite = action.payload;
        console.log("bookdetaildata", action.payload);
      })
      .addCase(getFavoritebooks.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      });
    builder
      .addCase(removeFavoriteBookAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFavoriteBookAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // state.favorite = action.payload;
        console.log("bookdetaildata", action.payload);
      })
      .addCase(removeFavoriteBookAsync.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      });
  },
});

export default bookSlice.reducer;
