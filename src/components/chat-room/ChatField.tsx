import React, { ChangeEvent, useState } from "react";
import Button from "../ui/Button";
import { RiSendPlaneFill } from "@remixicon/react";
import { useSearchParams } from "next/navigation";
import chatService from "@/server/chat";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EmojiSelector from "../ui/EmojiPicker";

const ChatField = () => {
  const params = useSearchParams();
  const name = params.get("name") || "";

  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (message !== "<p><br></p><p><br></p>") {
      chatService.add({
        name,
        text: message,
        date: new Date(),
      });
    }
    setMessage("");
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full h-20 bg-slate-600/80 flex items-center px-20 gap-4 backdrop-blur-[4px]"
      >
        <ReactQuill
          value={message}
          onChange={(value) => setMessage(value)}
          className="bg-white w-full border-none h-12 outline-none"
          modules={{ toolbar: false }}
          onKeyDown={handleKeyDown}
        />
        <EmojiSelector onSelect={(val) => setMessage((prev) => prev + val)} />

        <Button
          type="button"
          onClick={handleSubmit}
          className="w-12"
        >
          <RiSendPlaneFill size={24} />
        </Button>
      </form>
    </>
  );
};

export default ChatField;
