import EmojiPicker from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";

interface IProp {
  onSelect: (value: string) => void;
}

const EmojiSelector = ({ onSelect }: IProp) => {
  const [show, setShow] = useState(false);
  const emojiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleDetectClick = (e) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setShow(false);
      }
    };

    document.addEventListener("click", handleDetectClick);

    return () => document.removeEventListener("click", handleDetectClick);
  }, []);

  return (
    <div
      ref={emojiRef}
      className="relative"
    >
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="text-[32px]"
      >
        😀
      </button>
      {show && (
        <div className="absolute bottom-0 right-0">
          <EmojiPicker
            onEmojiClick={(value) => {
              setShow(false);
              onSelect(value.emoji);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiSelector;
