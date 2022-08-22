import { Socket } from "socket.io-client";
import { Component, For } from "solid-js";

interface ChatBodyProps {
  socket: Socket;
  messages: any[];
}

const ChatBody: Component<ChatBodyProps> = ( props ) => {
  return (
    <div>
      <For each={props.messages}>{
        (message, index) => (
          message.id === props.socket.id ? (
            <div class="flex">
              <div class="bg-red-200 p-3 rounded-md mx-3 my-2">
                { message.text }
              </div>
            </div>
          ) : (
            <div class="flex flex-row-reverse">
              <div class="flex flex-col mx-3 my-2">
                <div class="text-right pr-5">
                  { message.user }
                </div>
                <div class="bg-blue-200 text-right rounded-md p-3">
                  { message.text }
                </div>
              </div>
            </div>
          )
        )
      }</For>
    </div>
  );
}

export default ChatBody;