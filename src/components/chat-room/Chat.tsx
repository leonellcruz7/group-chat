import { IChat } from "@/lib/redux/chat";
import classNames from "classnames";
import { format, parseISO } from "date-fns";
import React from "react";

interface IProp {
  me?: boolean;
  chat: IChat;
}

const Chat = ({ me, chat }: IProp) => {
  const { name, text, date } = chat;
  return (
    <div className={classNames("flex gap-4", me && "justify-end")}>
      <div
        className={classNames(
          "flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-full bg-slate-500",
          me && "order-2"
        )}
      >
        <p className="capitalize text-white text-4xl font-medium">
          {name.slice(0, 1)}
        </p>
      </div>
      <div
        className={classNames(
          "space-y-2 flex flex-col items-start",
          me && "order-1 items-end"
        )}
      >
        <p
          className={classNames(
            "font-semibold text-gray-600",
            me && "text-right"
          )}
        >
          {name}
        </p>
        <div
          className={classNames(
            "bg-slate-100 p-4 rounded-xl md:mr-[300px] h-auto",
            me && "!bg-blue-600 md:ml-[300px] !mr-0"
          )}
        >
          <p
            className={classNames(
              "text-[14px] text-gray-800 break-words",
              me && "!text-white text-right"
            )}
          >
            {text}
          </p>
        </div>
        <p className="text-xs text-gray-400">
          {format(date, "eeee, LL/dd/yyyy - hh:mmaa")}
        </p>
      </div>
    </div>
  );
};

export default Chat;
