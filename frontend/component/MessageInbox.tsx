import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { request } from "../controllers/UserController";
import { useAuthToken } from "../hooks/AuthToken";
import { ErrorHandler } from "../libs/ErrorHandler";
import { Toaster } from "../libs/Toast";
import { IMessage, InboxData } from "../Models";

import { RandomAvatar, TrimLongText } from "./ChatList";
import { LoadingItems } from "./DropDownList";

import FormInput from "./FormInput";
import { Divider } from "./SideBar";

const scrollSmoothly = () => {
  const inbox = document.getElementById("inbox");
  if (!inbox) return;
  inbox.scrollIntoView({ behavior: "smooth", block: "end" });
};
type MessageInboxProps = {
  inboxData: InboxData | null;
  updateInboxData: (inbox: InboxData) => void;
};
export default function MessageInbox({
  inboxData,
  updateInboxData,
}: MessageInboxProps) {
  const { token, user, darkTheme } = useAuthToken();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const messagesRef = useRef(messages);
  //TODO when inboxData update refetch new messages
  const { data, error } = useSWR(
    inboxData ? `/message/${inboxData.user?.email}` : null,
    (url: string) => request<{ messages: IMessage[] }>("get", token ?? "", url)
  );

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!inboxData?.lastMessage) return;
    setMessages([...messages, inboxData?.lastMessage]);
  }, [inboxData?.lastMessage]);
  useEffect(() => {
    if (!data) return;
    setMessages(data.messages);
  }, [data?.messages]);
  useEffect(() => {
    scrollSmoothly();
  }, [messages]);
  if (error) {
    ErrorHandler(error);
    Toaster("error", "something went wrong while fetching messages", false);
    return (
      <div className="bg-gray-50 dark:bg-gray-700 w-full h-screen ml-96 flex flex-col ">
        <div className="w-full h-full flex justify-center items-center">
          <h1 className="text-4xl text-red-600 text-center">
            something went wrong <br />
            retrying !
            <LoadingItems />
          </h1>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-gray-50 dark:bg-gray-700 w-full h-screen ml-96 flex flex-col ">
      {!inboxData ? (
        <div className="w-full h-full flex justify-center items-center">
          <h1 className="text-4xl text-gray-600">select user to chat with</h1>
        </div>
      ) : (
        <>
          {!data ? (
            <LoadingItems />
          ) : (
            <>
              {" "}
              <BasicInfo name={inboxData.user?.name ?? "somebody"} />
              <Divider />
              <Inbox messages={messages ?? []} />
              <Divider />
              <MessageSender
                // send message to backend server
                //TODO: set up body request
                onClick={async () => {
                  try {
                    await request("post", token ?? "", "/messages", {
                      message,
                      toUser: inboxData.user?.email,
                    });
                    // data.messages.push({ message, sentBy: user?.email! });
                    inboxData.lastMessage = { message, sentBy: user?.email! };

                    //TODO:update inboxData
                    setMessage("");
                    updateInboxData(inboxData);
                  } catch (error) {
                    ErrorHandler(error);
                    Toaster(
                      "error",
                      "something went wrong while sending your message",
                      darkTheme
                    );
                  }
                }}
                //message stat
                message={message}
                //on message inpupt change
                setMessage={(s) => {
                  setMessage(s);
                }}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

type BasicInfoProps = {
  name: string;
};
function BasicInfo({ name }: BasicInfoProps) {
  return (
    <div className="p-1 drop-shadow-xl flex justify-center items-center gap-1">
      <div className="relative w-16 h-16 flex-shrink-0 flex-grow-0 ">
        {/*  TODO: for better results try it out with seeder */}
        <RandomAvatar />
      </div>
      <TrimLongText message={name} />
    </div>
  );
}

type InboxProps = {
  messages: IMessage[];
};
function Inbox({ messages }: InboxProps) {
  const { user } = useAuthToken();
  return (
    <div className="h-[90%] p-5 flex flex-col gap-2 overflow-y-auto scrollbar scrollbar-thumb-primarycolor scrollbar-thin scrollbar-thumb-rounded z-10 box-border">
      {/* TODO: fetch and add messages */}
      {messages.map((value, index) => {
        return (
          <Message
            message={value.message}
            alignment={value.sentBy !== user?.email}
            key={`message-${value.sentBy}-${index}`}
          />
        );
      })}
      <div id="inbox"></div>
    </div>
  );
}
type MessageProps = {
  message: string;
  alignment?: boolean;
};

function Message({ message, alignment = true }: MessageProps) {
  const borderRadiusStyle = alignment
    ? "rounded-r-lg rounded-bl-xl"
    : "rounded-l-lg rounded-tr-xl";
  const alignmentStyle = alignment ? "justify-start " : "justify-end ";
  return (
    <div className={`${alignmentStyle} w-full flex`}>
      <div
        className={`${borderRadiusStyle} p-2 bg-gray-300 dark:bg-gray-900 dark:text-white break-words`}
      >
        {message}
      </div>
    </div>
  );
}

type MessageSenderProps = {
  onClick: () => Promise<void>;
  message: string;
  setMessage: (s: string) => void;
};
function MessageSender({ onClick, message, setMessage }: MessageSenderProps) {
  return (
    <div className="flex-grow flex justify-center items-center">
      <FormInput
        icon={faFacebookMessenger}
        placeHolder="write some text"
        noIcon={true}
        value={message}
        onChange={(ev) => {
          setMessage(ev.target.value);
        }}
        onKeyUp={async (ev) => {
          if (ev.key === "Enter") {
            await onClick();
          }
        }}
      />
      <button
        onClick={async () => {
          try {
            await onClick();
          } catch (error) {
            ErrorHandler(error);
          }
        }}
        className="mx-5 p-0 px-3 w-10 h-8 rounded-xl text-primarycolor dark:text-white dark:hover:text-primarycolor   bg-gray-200 dark:bg-gray-700  hover:bg-primarycolor hover:text-white transform transition-all duration-300"
      >
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </div>
  );
}
