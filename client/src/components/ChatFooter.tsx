import { Socket } from "socket.io-client";
import { Component, createSignal } from "solid-js";

interface ChatFooterProps {
  socket: Socket;
}

const ChatFooter: Component<ChatFooterProps> = ( props ) => {
  const [ message, setMessage ] = createSignal("");

  function handleMessageInput(event: Event) {
    const target = event.target as HTMLInputElement;
    setMessage(target.value);
  }

  function handleMessageSubmit(event: Event) {
    event.preventDefault();
    props.socket.emit("message", {
      user: localStorage.getItem("userName") as string,
      text: message()
    });
    setMessage('');
  }

  return (
    <form
      class="flex flex-row"
      onSubmit={handleMessageSubmit}
    >
      <input
        type="text"
        class="flex-grow py-5 px-2 focus:outline-none"
        placeholder="Type your message"
        value={message()}
        onInput={handleMessageInput}
      />
      <input
        type="submit"
        class="px-10 border-l-2 hover:bg-slate-100 cursor-pointer"
        value="Send"
      />
    </form>
  );
}

export default ChatFooter;