import { useNavigate } from "@solidjs/router";
import { Socket } from "socket.io-client";
import { Component, createEffect, createSignal } from "solid-js";
import ChatBody from "../components/ChatBody";
import ChatFooter from "../components/ChatFooter";
import ChatUsers from "../components/ChatUsers";

interface ChatPageProps {
  socket: Socket;
}

const ChatPage: Component<ChatPageProps> = ( props ) => {
  const navigate = useNavigate();

  if (localStorage.getItem("userName") === null) {
    navigate("/home");
  }

  const [ users, setUsers ] = createSignal([] as any[]);
  const [ messages, setMessages ] = createSignal([] as any[]);

  createEffect(() => {
    props.socket.on('messageResponse', (message: any) => {
      setMessages([...messages(), message]);
    });

    props.socket.on('connectedUsers', (users: any[]) => {
      setUsers(users);
    });
  });

  return (
    <div class="flex flex-row h-screen">
      <div class="border-r-2">
        <ChatUsers users={users()} />
      </div>
      <div class="flex flex-col flex-grow">
        <div class="flex flex-col-reverse flex-grow overflow-y-scroll">
          <ChatBody messages={messages()} socket={props.socket}/>
        </div>
        <div class="border-t-2">
          <ChatFooter socket={props.socket}/>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;