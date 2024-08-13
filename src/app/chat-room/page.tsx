"use client";

import Chat from "@/components/chat-room/Chat";
import ChatField from "@/components/chat-room/ChatField";
import Loader from "@/components/ui/Loader";
import { db } from "@/lib/firebase";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { initializeChat } from "@/lib/redux/chat";
import chatService from "@/server/chat";
import { useQuery } from "@tanstack/react-query";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useSearchParams } from "next/navigation";

import React, { useEffect, useRef } from "react";

const page = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: chatService.list,
  });

  const dispatch = useAppDispatch();

  const params = useSearchParams();

  const name = params.get("name") || "leonell";

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const { chats } = useAppSelector((state) => state.chat);

  useEffect(() => {
    data && dispatch(initializeChat(data));
  }, [data]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  useEffect(() => {
    const chatsRef = collection(db, "chats");

    const q = query(chatsRef, orderBy("date", "asc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const messagesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        dispatch(initializeChat(messagesData));
      },
      (error) => {
        console.error("Error fetching chats:", error);
      }
    );

    return () => unsubscribe();
  }, []);

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
          <div className="fixed bottom-[80px] w-[90%] rounded-b-[30px] overflow-hidden">
            <ChatField />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
