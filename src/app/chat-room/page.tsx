"use client";

import ChatBox from "@/components/chat-room/ChatBox";
import Loader from "@/components/ui/Loader";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { initializeChat, setHasMore, setName } from "@/lib/redux/chat";
import chatService from "@/server/chat";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ChatRoom = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const { name } = useAppSelector((state) => state.chat);

  const { isLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: () =>
      chatService.list().then((res) => {
        dispatch(initializeChat(res.chats.slice(1, res.chats.length - 1)));
        dispatch(setHasMore(res.hasMore));
        return res;
      }),
  });

  useEffect(() => {
    // forces user to enter name
    if (sessionStorage.getItem("name")) {
      dispatch(setName(sessionStorage.getItem("name") || ""));
    } else {
      router.push("/");
    }
  }, []);

  if (isLoading)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="flex flex-col relative items-center justify-center w-screen h-screen">
      <div className="w-[90%] h-[90%] space-y-4">
        <p className="text-[24px] font-semibold">{name}</p>
        <ChatBox isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatRoom;
