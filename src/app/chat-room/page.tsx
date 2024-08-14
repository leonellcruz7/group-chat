"use client";

import Chat from "@/components/chat-room/Chat";
import ChatField from "@/components/chat-room/ChatField";
import Loader from "@/components/ui/Loader";
import { db } from "@/lib/firebase";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addChat, initializeChat, loadNextChats } from "@/lib/redux/chat";
import chatService from "@/server/chat";
import { RiArrowDownLine } from "@remixicon/react";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";

const ChatRoom = () => {
  const [hasMore, setHasMore] = useState(true);

  const router = useRouter();

  const [name, setName] = useState("");

  const dispatch = useAppDispatch();

  const [fetchingNextData, setfetchingNextData] = useState(false);

  const { chats } = useAppSelector((state) => state.chat);

  const { isLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: () =>
      chatService.list().then((res) => {
        dispatch(initializeChat(res.chats));
        setHasMore(res.hasMore);
        return res;
      }),
  });

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollDown = useCallback(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  const fetchNextData = () => {
    setfetchingNextData(true);

    chatService.list(chats[0].id!).then((res) => {
      setfetchingNextData(false);

      dispatch(loadNextChats(res.chats));

      setHasMore(res.hasMore);

      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight / (chats.length / 7),
        });
      }
    });
  };

  const detectScroll = debounce(() => {
    if (chatContainerRef.current) {
      const { scrollTop } = chatContainerRef.current;

      if (scrollTop === 0) {
        hasMore && fetchNextData();
      }
    }
  }, 300);

  useEffect(() => {
    if (chatContainerRef.current) {
      handleScrollDown();
    }
  }, [isLoading, handleScrollDown]);

  useEffect(() => {
    const container = chatContainerRef.current;

    container && container.addEventListener("scroll", detectScroll);

    return () => {
      container && container.removeEventListener("scroll", detectScroll);
    };
  }, [chats, detectScroll]);

  useEffect(() => {
    if (sessionStorage.getItem("name")) {
      setName(sessionStorage.getItem("name") || "");
    } else {
      router.push("/");
    }

    const chatsRef = collection(db, "chats");

    const q = query(chatsRef, orderBy("date", "desc"), limit(1));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data: any = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

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

  if (isLoading)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="w-[90%] h-[90%] space-y-4">
        <p className="text-[24px] font-semibold">{name}</p>
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
            onClick={() => handleScrollDown()}
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
      </div>
    </div>
  );
};

export default ChatRoom;
