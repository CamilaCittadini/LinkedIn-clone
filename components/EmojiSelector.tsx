import React from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

interface EmojiSelectorType {
  onEmojiClick: (emojiObject: EmojiClickData, event: MouseEvent) => void;
}

const EmojiSelector = ({ onEmojiClick }: EmojiSelectorType) => {
  return (
    <div className="absolute -top-16">
      <EmojiPicker onEmojiClick={onEmojiClick} />
    </div>
  );
};

export { EmojiSelector };
