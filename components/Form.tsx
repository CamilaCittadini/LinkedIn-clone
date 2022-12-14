import React, { useRef, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import classNames from "classnames";
import { EmojiSelector } from "./EmojiSelector";
import { EmojiClickData } from "emoji-picker-react";
import { useMutation, useQuery } from "react-query";
import { fetchPost, PostInfo, updatePost, uploadPost } from "../services";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "../atoms/modalAtom";
export interface Inputs {
  textArea: string;
  urlText: string;
}

interface FormProps {
  post?: PostInfo;
}

const Form = ({ post }: FormProps) => {
  const initialFormValues = post ? post : emptyForm;

  const { control, handleSubmit, watch, register, setValue } = useForm<Inputs>({
    defaultValues: initialFormValues,
  });

  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);

  const [openEmojiSelector, setOpenEmojiSelector] = useState<boolean>(false);

  /*textValue and textAreaRef created for form emoji implementation
  textAreaRef refers to the cursor position in the textArea, 
  while textValue is the text in the text area (in Form.tsx)*/

  const [textValue, setTextValue] = useState<string>(
    initialFormValues?.textArea
  );
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  /*the function onEmojiClick allows selecting text (drag cursor from start to end)
  and slices the text to insert the emoji, which is obtained from emojiObject*/
  const onEmojiClick = (emojiObject: EmojiClickData, event: MouseEvent) => {
    const selectionStart = textAreaRef.current?.selectionStart;
    const selectionEnd = textAreaRef.current?.selectionEnd;
    const newValue =
      textValue.slice(0, selectionStart) +
      emojiObject.emoji +
      textValue.slice(selectionEnd);
    setTextValue(newValue);
    setValue("textArea", newValue);
  };

  const onHashtagClick = () => {
    const selectionStart = textAreaRef.current?.selectionStart;
    const selectionEnd = textAreaRef.current?.selectionEnd;
    const newValue =
      textValue.slice(0, selectionStart) + "#" + textValue.slice(selectionEnd);
    setTextValue(newValue);
    setValue("textArea", newValue);
  };

  const { data: session } = useSession();

  const { data, refetch } = useQuery("linkedin-post", fetchPost);

  //POST Request
  const { mutate: createPost } = useMutation("linkedin-post", uploadPost, {
    onSuccess() {
      refetch();
      setModalOpen(false);
    },
  });

  //the mapToPost function will compile all the information needed to create the post in the post variable
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const post = mapToPost(data, session);
    createPost(post);
  };

  //PATCH
  const { mutate: patchPost } = useMutation("linkedin-post", updatePost, {
    onSuccess() {
      refetch();
      setModalOpen(false);
    },
  });

  const submitUpdate: SubmitHandler<Inputs> = (data) => {
    const postWithId: PostInfo = { ...data, _id: post?._id };
    patchPost(postWithId);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col">
      <Controller
        name="textArea"
        control={control}
        render={({ field: { onChange } }) => (
          <textarea
            rows={4}
            className="bg-transparent focus:outline-none dark:placeholder-white/75"
            placeholder="What do you want to talk about?"
            value={textValue}
            onChange={(event) => {
              onChange(event);
              setTextValue(event.target.value);
            }}
            ref={textAreaRef}
          />
        )}
      />
      <div className="flex space-x-2 items-center">
        <div className="cursor-pointer p-2 rounded-full dark:hover:bg-[#464a4d] hover:bg-[#ebebeb]">
          <SentimentSatisfiedAltIcon
            onClick={() => setOpenEmojiSelector(!openEmojiSelector)}
            className="w-7 h-7"
          />
        </div>
        <div
          onClick={() => onHashtagClick()}
          className="cursor-pointer font-semibold text-lg rounded-md px-2 py-1 text-[#2B7CCC] dark:text-[#6BACEC] hover:bg-[#E2F0FE] dark:hover:bg-[#2D3F50]"
        >
          Add hashtag
        </div>
      </div>
      <input
        type="text"
        {...register("urlText")}
        placeholder="Add a photo URL (optional)"
        className="bg-transparent focus:outline-none dark:placeholder-white/75 truncate max-w-xs md:max-w-sm"
      />
      <button
        type="submit"
        disabled={textValue === "" && !watch("urlText")}
        className={classNames(
          "cursor-pointer w-24 h-8 px-4 self-end text-center rounded-full text-md font-semibold disabled:cursor-not-allowed",
          {
            "bg-gray-300 text-gray-500 dark:bg-[#85878a52] dark:text-[#85878A]":
              textValue === "" && !watch("urlText"),
            "text-white bg-[#2675CC] hover:bg-[#004182] dark:bg-[#6BACEC] dark:hover:bg-[#a8d4ff] dark:text-[#1D2226]":
              textValue != "" || watch("urlText"),
          }
        )}
        onClick={
          modalType === "CreatePost"
            ? handleSubmit(onSubmit)
            : handleSubmit(submitUpdate)
        }
      >
        {modalType === "CreatePost" ? "Post" : "Update"}
      </button>
      <div className="relative">
        {openEmojiSelector && <EmojiSelector onEmojiClick={onEmojiClick} />}
      </div>
    </form>
  );
};

export default Form;

const mapToPost = (form: Inputs, session: Session | null): PostInfo => {
  return {
    username: session?.user?.name,
    email: session?.user?.email,
    image: session?.user?.image,
    textArea: form.textArea,
    urlText: form?.urlText,
  };
};

const emptyForm: PostInfo = {
  username: "",
  email: "",
  image: "",
  textArea: "",
  urlText: "",
};
