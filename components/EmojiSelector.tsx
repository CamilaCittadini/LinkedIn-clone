import React from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

const EmojiSelector = ({ onEmojiClick }) => {
  return (
    <div className="absolute top-2">
      <EmojiPicker onEmojiClick={onEmojiClick} />
    </div>
  );
};

export { EmojiSelector };
