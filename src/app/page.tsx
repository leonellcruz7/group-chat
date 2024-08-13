"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { cookie } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "universal-cookie";

export default function Home() {
  const [name, setName] = useState("");

  const router = useRouter();

  const handleEnter = () => {
    router.push(`/chat-room?name=${name}`);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-200">
      <div className="flex flex-col w-[600px] bg-white p-6 rounded-xl gap-4">
        <div className="space-y-1">
          <label
            htmlFor="name"
            className="text-[18px] font-bold"
          >
            Enter your name
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
          />
        </div>
        <Button onClick={handleEnter}>Enter</Button>
      </div>
    </div>
  );
}
