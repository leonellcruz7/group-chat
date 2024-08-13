import React, { ChangeEvent, useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { RiHeartFill, RiSendPlaneFill } from "@remixicon/react";
import { useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { addChat } from "@/lib/redux/chat";
import chatService from "@/server/chat";

const ChatField = () => {
  const dispatch = useAppDispatch();
  const params = useSearchParams();
  const name = params.get("name") || "";

  const [message, setMessage] = useState("");

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(message);

    chatService.add({ name, text: message, date: new Date() });

    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-20 bg-slate-600/80 flex items-center px-20 gap-4 backdrop-blur-[4px]"
    >
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        textarea
        className=" whitespace-pre-wrap"
      />
      <Button
        type="submit"
        className="w-12"
      >
        <RiSendPlaneFill size={24} />
      </Button>
    </form>
  );
};

export default ChatField;
