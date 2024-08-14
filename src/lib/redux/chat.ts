import { createSlice } from "@reduxjs/toolkit";

export interface IChat {
  id?: string;
  name: string;
  text: string;
  date: Date;
}

const initialState: { chats: IChat[] } = {
  chats: [],
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
  },
});

export const { addChat, initializeChat, loadNextChats } = chatSlice.actions;
export default chatSlice.reducer;
