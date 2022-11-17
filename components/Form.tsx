import React, { Dispatch, LegacyRef, SetStateAction, useRef } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { EmojiSelector } from "./EmojiSelector";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { useState } from "react";
import { EmojiClickData } from "emoji-picker-react";

interface Inputs {
  text: string;
}

interface FormType {
  openEmojiSelector: boolean;
  setOpenEmojiSelector: Dispatch<SetStateAction<boolean>>;
  textAreaRef: LegacyRef<HTMLTextAreaElement>;
  textValue: string;
  setTextValue: (s: string) => void;
}

const Form = ({
  openEmojiSelector,
  setOpenEmojiSelector,
  textAreaRef,
  textValue,
  setTextValue,
}: FormType) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="text"
        control={control}
        render={({ field }) => (
          <textarea
            {...field}
            rows={4}
            className="dark:bg-[#1D2226] focus:outline-none"
            value={textValue}
            onChange={(event) => setTextValue(event.target.value)}
            ref={textAreaRef}
          />
        )}
      />

      <SentimentSatisfiedAltIcon
        onClick={() => setOpenEmojiSelector(!openEmojiSelector)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
