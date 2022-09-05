import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getList = createAsyncThunk("getList", async ({ value }) => {
  const result = await axios.get(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?&q=${value}&page=1&api-key=${process.env.REACT_APP_API_KEY}`
  );
  return result.data;
});

const newsReducer = createSlice({
  name: "newsArticle",
  initialState: {
    isLoading: false,
    keywords: [],
    clipes: [],
    articles: [],
    page: 1,
  },
  reducers: {
    addClip: (state, action) => {
      if (state.clipes.some((clip) => clip._id === action.payload._id)) {
        state.clipes = state.clipes.filter(
          (clip) => clip._id !== action.payload._id
        );
      } else {
        state.clipes.push(action.payload);
      }
    },

    // 키워드 다섯개까지만 저장
    keywordUpdate: (state, action) => {
      state.keywords = state.keywords.filter(
        (keyword) => keyword !== action.payload
      );
      if (state.keywords.length >= 5) state.keywords.shift();
      state.keywords.push(action.payload);
    },
  },
  extraReducers: {
    [getList.pending]: (state) => {
      state.isLoading = true;
      console.log("api호출 대기중");
    },
    [getList.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      console.log("api호출 성공");
      console.log(payload);
      state.articles = payload.response.docs;
    },
    [getList.rejected]: (state) => {
      state.isLoading = true;
      console.log("api호출 실패");
    },
  },
});

export default newsReducer;
export const { keywordUpdate, addClip } = newsReducer.actions;
