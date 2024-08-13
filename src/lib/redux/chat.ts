import { createSlice } from "@reduxjs/toolkit";

export interface IChat {
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
    addChat: (state, action: { payload: IChat }) => {
      state.chats = [...state.chats, action.payload];
    },
    initializeChat: (state, action) => {
      state.chats = action.payload;
    },
  },
});

export const { addChat, initializeChat } = chatSlice.actions;
export default chatSlice.reducer;
