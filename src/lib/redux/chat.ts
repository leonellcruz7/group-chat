import { createSlice } from "@reduxjs/toolkit";

export interface IChat {
  id?: string;
  name: string;
  text: string;
  date: Date;
}

const initialState: { chats: IChat[]; hasMore: boolean; name: string } = {
  chats: [],
  hasMore: true,
  name: "",
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addChat: (state, action: { payload: IChat[] }) => {
      state.chats = [...state.chats, ...action.payload];
    },
    initializeChat: (state, action) => {
      state.chats = action.payload;
    },
    loadNextChats: (state, action) => {
      state.chats = [...action.payload, ...state.chats];
    },
    setHasMore: (state, action: { payload: boolean }) => {
      state.hasMore = action.payload;
    },

    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { addChat, initializeChat, loadNextChats, setHasMore, setName } =
  chatSlice.actions;
export default chatSlice.reducer;
