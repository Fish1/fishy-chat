import { useNavigate } from "@solidjs/router";
import { Component, For } from "solid-js";

interface ChatUsersProps {
  users: any[];
}

const ChatUsers: Component<ChatUsersProps> = ( props ) => {

  const navigate = useNavigate();

  function handleLogoutClick() {
    localStorage.removeItem("userName");
    navigate("/home");
  }

  return (
    <div class="flex flex-col">
      <input
        type="button"
        value="Logout"
        class="border-b-2 mb-2 p-2 hover:bg-slate-200 cursor-pointer"
        onClick={handleLogoutClick}
      />
      <div>
        <For each={props.users}>{
          (user, index) => (
            <div class="bg-green-100 my-3 mx-2 p-2 rounded-md">
              {user}
            </div>
          )
        }</For>
      </div>
    </div>
  );
}

export default ChatUsers;