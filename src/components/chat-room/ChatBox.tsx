import { db } from "@/lib/firebase";
import {
  detectScroll,
  handleScrollDown,
  useAppDispatch,
  useAppSelector,
} from "@/lib/hooks";
import { addChat, loadNextChats, setHasMore, setName } from "@/lib/redux/chat";
import chatService from "@/server/chat";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import Loader from "../ui/Loader";
import Chat from "./Chat";
import { RiArrowDownLine } from "@remixicon/react";
import ChatField from "./ChatField";

interface IProp {
  isLoading?: boolean;
}

const ChatBox = ({ isLoading }: IProp) => {
  const dispatch = useAppDispatch();

  const [fetchingNextData, setfetchingNextData] = useState(false);

  const { chats, name, hasMore } = useAppSelector((state) => state.chat);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const fetchNextData = () => {
    setfetchingNextData(true);

    chatService.list(chats[0].id!).then((res) => {
      setfetchingNextData(false);

      dispatch(loadNextChats(res.chats));

      dispatch(setHasMore(res.hasMore));

      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight / (chats.length / 7),
        });
      }
    });
  };

  useEffect(() => {
    // initial scroll down on page load
    if (chatContainerRef.current) {
      handleScrollDown(chatContainerRef);
    }
  }, [isLoading, handleScrollDown]);

  useEffect(() => {
    const container = chatContainerRef.current;

    container &&
      container.addEventListener("scroll", () =>
        // fetch data when scrolled to top
        detectScroll(chatContainerRef, hasMore && fetchNextData)
      );

    return () => {
      container &&
        container.removeEventListener("scroll", () =>
          detectScroll(chatContainerRef, hasMore && fetchNextData)
        );
    };
  }, [chats]);

  useEffect(() => {
    const chatsRef = collection(db, "chats");

    const q = query(chatsRef, orderBy("date", "desc"), limit(1));

    // controls live update
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data: any = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // adds latest message on chat array
        dispatch(
          addChat([
            {
              id: data[0].id,
              name: data[0].name,
              text: data[0].text,
              date: data[0].date,
            },
          ])
        );
      },

      (error) => {
        console.error("Error fetching chats:", error);
      }
    );

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div
      ref={chatContainerRef}
      className="bg-gray-200 rounded-[30px] overflow-hidden relative w-full h-[90%] pb-40 overflow-y-scroll"
    >
      <div className="p-4 space-y-10">
        {fetchingNextData && (
          <div className="absolute top-10 left-[50%] translate-x-[-50%]">
            <Loader />
          </div>
        )}
        {chats.map((item, index) => {
          return (
            <Chat
              chat={item}
              key={index}
              me={name === item.name}
            />
          );
        })}
      </div>

      <button
        onClick={() => handleScrollDown(chatContainerRef)}
        className="rounded-full w-10 h-10 flex items-center justify-center bg-gray-600 hover:bg-gray-400 transition-all fixed bottom-[180px] left-[50%] translate-x-[-50%] z-10"
      >
        <RiArrowDownLine
          size={24}
          color="white"
        />
      </button>

      <div className="fixed bottom-[80px] w-[90%] rounded-b-[30px]">
        <ChatField />
      </div>
    </div>
  );
};

export default ChatBox;
